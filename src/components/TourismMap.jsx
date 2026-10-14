import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { Layers, Compass, Info } from "lucide-react";
import { kecamatanAnalytics, objekWisata, ruteWisataTematik } from "../data/pariwisataData";
import { calculateTPS, formatNumber, formatShortRupiah } from "../utils/analytics";
import { swapEsriBasemap } from "../utils/basemaps";

function getTPSColor(score) {
  if (!score) return "#cbd5e1";
  if (score >= 85) return "#2563eb";
  if (score >= 75) return "#3b82f6";
  if (score >= 65) return "#60a5fa";
  if (score >= 55) return "#f59e0b";
  return "#ef4444";
}

function getRiskColor(risk) {
  if (risk?.includes("Sedang-Tinggi") || risk?.includes("Tinggi")) return "#dc2626";
  if (risk?.includes("Sedang")) return "#f59e0b";
  return "#10b981";
}

export function TourismMap({ onSelectDestinasi, selectedKecamatanFilter, activeRouteId }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const markersGroupRef = useRef(null);
  const routeLayerGroupRef = useRef(null);

  const [mapMode, setMapMode] = useState("tps");
  const [geoDataKec, setGeoDataKec] = useState(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const [hoveredInfo, setHoveredInfo] = useState(null);

  const roadLayersGroupRef = useRef(null);
  const basemapLayerRef = useRef(null);
  const [showRoads, setShowRoads] = useState(false);
  const [basemapType, setBasemapType] = useState("street"); // 'street' | 'satellite'
  const [roadData, setRoadData] = useState({ nasional: null, provinsi: null, kabupaten: null });

  // Fetch road data once on load
  useEffect(() => {
    Promise.all([
      fetch("/jalan_nasional.geojson").then(res => res.json()).catch(() => null),
      fetch("/jalan_provinsi.geojson").then(res => res.json()).catch(() => null),
      fetch("/jalan_kabupaten.geojson").then(res => res.json()).catch(() => null)
    ]).then(([nasional, provinsi, kabupaten]) => {
      setRoadData({ nasional, provinsi, kabupaten });
    });
  }, []);

  // Auto-switch to routes mode when activeRouteId is set from parent
  useEffect(() => {
    if (activeRouteId) {
      setMapMode("routes");
    } else {
      setMapMode("tps");
    }
  }, [activeRouteId]);

  useEffect(() => {
    fetch("/peta_kecamatan.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoDataKec(data);
        setIsLoadingGeo(false);
      })
      .catch((err) => {
        console.error("Gagal membaca peta_kecamatan.geojson", err);
        setIsLoadingGeo(false);
      });
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-7.33, 109.70],
      zoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    markersGroupRef.current = L.layerGroup().addTo(map);
    routeLayerGroupRef.current = L.layerGroup().addTo(map);
    roadLayersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      basemapLayerRef.current = null;
    };
  }, []);

  // Attach/swap ESRI basemap (street / satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    basemapLayerRef.current = swapEsriBasemap(map, basemapLayerRef.current, basemapType);
  }, [basemapType]);

  // Draw road networks dynamically
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !roadLayersGroupRef.current) return;

    roadLayersGroupRef.current.clearLayers();

    if (showRoads) {
      // 1. Jalan Nasional (Red/Orange, thick)
      if (roadData.nasional) {
        const layer = L.geoJSON(roadData.nasional, {
          style: { color: "#ea580c", weight: 4.5, opacity: 0.95 },
          onEachFeature: (feature, layer) => {
            layer.bindTooltip(`Jalan Nasional: ${feature.properties?.nama || feature.properties?.Name || "Jalan Utama"}`, { sticky: true });
          }
        });
        roadLayersGroupRef.current.addLayer(layer);
        layer.bringToFront();
      }
      // 2. Jalan Provinsi (Yellow/Amber, medium)
      if (roadData.provinsi) {
        const layer = L.geoJSON(roadData.provinsi, {
          style: { color: "#d97706", weight: 3.5, opacity: 0.9 },
          onEachFeature: (feature, layer) => {
            layer.bindTooltip(`Jalan Provinsi: ${feature.properties?.nama || feature.properties?.Name || "Lintas Provinsi"}`, { sticky: true });
          }
        });
        roadLayersGroupRef.current.addLayer(layer);
        layer.bringToFront();
      }
      // 3. Jalan Kabupaten (Slate/Gray, thin)
      if (roadData.kabupaten) {
        const layer = L.geoJSON(roadData.kabupaten, {
          style: { color: "#475569", weight: 2.2, opacity: 0.8 },
          onEachFeature: (feature, layer) => {
            layer.bindTooltip(`Jalan Kabupaten: ${feature.properties?.nama || feature.properties?.Name || "Penghubung Kabupaten"}`, { sticky: true });
          }
        });
        roadLayersGroupRef.current.addLayer(layer);
        layer.bringToFront();
      }
    }
  }, [showRoads, roadData]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !geoDataKec) return;

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    const geoJsonLayer = L.geoJSON(geoDataKec, {
      style: (feature) => {
        const rawName = feature.properties?.Kecamatan || feature.properties?.Name || "";
        const kecName = rawName.trim().toLowerCase();
        const match = kecamatanAnalytics.find((k) => k.kecamatan.toLowerCase() === kecName);

        let fillColor = "#cbd5e1";
        if (mapMode === "tps") {
          const tps = match ? match.tpsScore : 50;
          fillColor = getTPSColor(tps);
        } else if (mapMode === "carrying") {
          fillColor = getRiskColor(match?.carryingCapacityRisk);
        }

        const isFiltered = selectedKecamatanFilter && selectedKecamatanFilter.toLowerCase() === kecName;

        return {
          fillColor,
          weight: isFiltered ? 3 : 1.5,
          opacity: 1,
          color: isFiltered ? "#2563eb" : "#94a3b8",
          dashArray: isFiltered ? "" : "3",
          fillOpacity: isFiltered ? 0.8 : 0.5,
        };
      },
      onEachFeature: (feature, layer) => {
        const rawName = feature.properties?.Kecamatan || feature.properties?.Name || "";
        const kecName = rawName.trim();
        const match = kecamatanAnalytics.find((k) => k.kecamatan.toLowerCase() === kecName.toLowerCase());

        layer.on({
          mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 0.75, weight: 2.5, color: "#2563eb" });
            setHoveredInfo({
              name: kecName,
              tps: match ? match.tpsScore : "N/A",
              pengunjung: match ? match.totalPengunjung : 0,
              pad: match ? match.padRetribusi : 0,
              risk: match ? match.carryingCapacityRisk : "Normal",
            });
          },
          mouseout: (e) => { geoJsonLayer.resetStyle(e.target); setHoveredInfo(null); },
          click: () => { map.fitBounds(layer.getBounds(), { padding: [20, 20] }); },
        });
      },
    }).addTo(map);

    geoJsonLayer.bringToBack();

    geoJsonLayerRef.current = geoJsonLayer;
  }, [geoDataKec, mapMode, selectedKecamatanFilter]);

  // Category emoji mapping — matches actual kategori values in data
  const categoryEmojis = {
    "Alam & Geo-Tourism": "🏔️",
    "Alam & Konservasi": "🌿",
    "Alam & Ekowisata": "🌲",
    "Alam & Geothermal": "♨️",
    "Budaya & Sejarah": "🏛️",
    "Desa Wisata & Budaya": "🎭",
    "Wisata Kuliner": "🍜",
    "Wisata Tirta & Petualangan": "🏄",
    "Geo-Tourism & Danau": "🌊",
    "Spot Foto & Rekreasi": "📸",
    "Edu-Wisata & Konservasi": "🦜",
    "Agrowisata": "🌾",
    "Kultur & Musik": "🎵",
    "Kuliner & Ekonomi Kreatif": "🍽️",
    "Religi & Tradisi": "🕌",
    "Edu-Ekowisata": "🦋",
    "Olahraga & Wisata Tirta": "⛵",
  };

  const defaultEmoji = "📍";

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    objekWisata.forEach((item) => {
      if (selectedKecamatanFilter && selectedKecamatanFilter.toLowerCase() !== "semua" && item.kecamatan.toLowerCase() !== selectedKecamatanFilter.toLowerCase()) {
        return;
      }

      // Get emoji based on category
      const emoji = categoryEmojis[item.kategori] || defaultEmoji;

      // Create custom marker with emoji on red pin background
      const customIcon = L.divIcon({
        className: "tourism-map-marker",
        html: `
          <div style="
            width: 32px;
            height: 44px;
            cursor: pointer;
            position: relative;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));
            transition: transform 0.15s ease;
          " onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'">
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 32px;
              height: 32px;
              background: linear-gradient(180deg, #f87171 0%, #dc2626 100%);
              border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
              transform: translateY(5px);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="font-size: 16px; line-height: 1;">${emoji}</span>
            </div>
            <div style="
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 10px solid #dc2626;
            "></div>
          </div>
        `,
        iconSize: [32, 44],
        iconAnchor: [16, 44],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon });

      const categoryColor = {
        "Alam & Geo-Tourism": "#0284c7",
        "Alam & Konservasi": "#059669",
        "Alam & Ekowisata": "#15803d",
        "Alam & Geothermal": "#b91c1c",
        "Budaya & Sejarah": "#b45309",
        "Desa Wisata & Budaya": "#6d28d9",
        "Wisata Kuliner": "#be123c",
        "Wisata Tirta & Petualangan": "#1d4ed8",
        "Geo-Tourism & Danau": "#0369a1",
        "Spot Foto & Rekreasi": "#db2777",
        "Edu-Wisata & Konservasi": "#0f766e",
        "Agrowisata": "#047857",
        "Kultur & Musik": "#4f46e5",
        "Kuliner & Ekonomi Kreatif": "#a21caf",
        "Religi & Tradisi": "#1e3a8a",
        "Edu-Ekowisata": "#0891b2",
        "Olahraga & Wisata Tirta": "#0369a1"
      }[item.kategori] || "#475569";

      const popupContent = document.createElement("div");
      popupContent.style.cssText = "min-width:230px; font-family:'Inter',sans-serif; font-size:12px; margin:-4px -1px -4px -1px; overflow:hidden; border-radius:12px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);";
      popupContent.innerHTML = `
        <div style="background:${categoryColor}; color:white; padding:12px 14px; border-top-left-radius:10px; border-top-right-radius:10px; position:relative;">
          <span style="font-size:9px; text-transform:uppercase; font-weight:700; background:rgba(255,255,255,0.25); padding:2px 6px; border-radius:9999px; letter-spacing:0.05em; display:inline-block; margin-bottom:6px;">
            ${emoji} ${item.kategori}
          </span>
          <h4 style="font-size:13px; font-weight:800; color:white; margin:0; line-height:1.3; text-shadow: 0 1px 2px rgba(0,0,0,0.15);">${item.nama}</h4>
        </div>
        <div style="padding:12px 14px; background:white; border-bottom-left-radius:10px; border-bottom-right-radius:10px; border:1px solid #e2e8f0; border-top:none;">
          <div style="display:flex; align-items:center; gap:6px; color:#475569; font-size:11px; margin-bottom:8px;">
            <span style="font-size:13px;">📍</span>
            <span>Desa <b>${item.desa}</b>, Kec. ${item.kecamatan}</span>
          </div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; border-top:1px solid #f1f5f9; padding-top:8px; margin-bottom:10px;">
            <div style="background:#f8fafc; padding:6px; border-radius:6px; border:1px solid #f1f5f9; text-align:center;">
              <div style="font-size:8px; color:#94a3b8; font-weight:700; text-transform:uppercase; letter-spacing:0.02em;">Kunjungan</div>
              ${
                item.pengunjung > 0
                  ? `<div style="font-size:11px; font-weight:700; color:#1e293b; font-family:monospace; margin-top:2px;">${formatNumber(item.pengunjung)} <span style="font-size:8px; font-weight:normal; color:#64748b;">/th</span></div>`
                  : `<div style="font-size:10px; font-style:italic; color:#94a3b8; margin-top:3px;">Belum terdata</div>`
              }
            </div>
            <div style="background:#f0fdf4; padding:6px; border-radius:6px; border:1px solid #dcfce7; text-align:center;">
              <div style="font-size:8px; color:#16a34a; font-weight:700; text-transform:uppercase; letter-spacing:0.02em;">Retribusi PAD</div>
              ${
                item.padTahunan > 0
                  ? `<div style="font-size:11px; font-weight:700; color:#15803d; font-family:monospace; margin-top:2px;">${formatShortRupiah(item.padTahunan)}</div>`
                  : `<div style="font-size:10px; font-style:italic; color:#94a3b8; margin-top:3px;">Belum terdata</div>`
              }
            </div>
          </div>

          <button id="btn-detail-${item.id}" style="width:100%; background:#0f172a; color:white; font-size:11px; font-weight:700; padding:8px; border:none; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px; box-shadow:0 2px 4px rgba(0,0,0,0.1); transition:background 0.2s;">
            Analisa Detil Destinasi &rarr;
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on("popupopen", () => {
        const btn = document.getElementById(`btn-detail-${item.id}`);
        if (btn) btn.onclick = () => onSelectDestinasi(item);
      });

      markersGroupRef.current.addLayer(marker);
    });
  }, [selectedKecamatanFilter, onSelectDestinasi]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !routeLayerGroupRef.current) return;

    routeLayerGroupRef.current.clearLayers();

    if (activeRouteId) {
      const routesToDraw = ruteWisataTematik.filter((r) => r.id === activeRouteId);
      const allCoords = [];

      routesToDraw.forEach((rute) => {
        // Flexible matching: try exact, substring, then keyword-based
        const points = rute.objekTujuan
          .map((routeName) => {
            let match = objekWisata.find((o) => o.nama === routeName);
            if (match) return match;
            match = objekWisata.find((o) => o.nama.includes(routeName) || routeName.includes(o.nama));
            if (match) return match;
            const routeWords = routeName.toLowerCase().split(/\s+/).filter(w => w.length > 2);
            match = objekWisata.find((o) => {
              const objWords = o.nama.toLowerCase().split(/\s+/);
              return routeWords.some(rw => objWords.some(ow => ow.includes(rw) || rw.includes(ow)));
            });
            if (match) return match;
            match = objekWisata.find((o) => routeWords.some(rw => o.nama.toLowerCase().includes(rw)));
            return match || null;
          })
          .filter(Boolean);

        if (points.length >= 2) {
          const coords = points.map(p => [p.lat, p.lng]);
          coords.forEach(c => allCoords.push(c));

          // Fetch driving route coordinates from free OSRM Routing API
          const coordsQuery = points.map(p => `${p.lng},${p.lat}`).join(";");
          const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordsQuery}?overview=full&geometries=geojson`;

          fetch(osrmUrl)
            .then(res => res.json())
            .then(data => {
              if (data && data.routes && data.routes[0] && data.routes[0].geometry) {
                const routeLine = L.geoJSON(data.routes[0].geometry, {
                  style: {
                    color: rute.warna,
                    weight: 5,
                    opacity: 0.9,
                    lineJoin: "round"
                  }
                });

                const distKm = (data.routes[0].distance / 1000).toFixed(1);
                routeLine.bindTooltip(
                  `<div style="font-family:'Inter',sans-serif; font-size:11px; font-weight:600; padding:4px 8px; background:white; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.15);">${rute.namaRute} (${rute.durasi})<br/><span style="font-size:9px; font-weight:normal; color:#64748b;">Jarak: ${distKm} km</span></div>`,
                  { sticky: true }
                );

                routeLayerGroupRef.current.addLayer(routeLine);
                routeLine.bringToFront();
              } else {
                throw new Error("Invalid geometry");
              }
            })
            .catch(err => {
              console.warn("OSRM routing failed, drawing straight line:", err);
              // Fallback to straight dashed line
              const polyline = L.polyline(coords, {
                color: rute.warna,
                weight: 4,
                opacity: 0.85,
                dashArray: "6, 8",
                lineJoin: "round",
              });

              polyline.bindTooltip(
                `<div style="font-family:'Inter',sans-serif; font-size:11px; font-weight:600; padding:4px 8px; background:white; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.15);">${rute.namaRute} (${rute.durasi})</div>`,
                { sticky: true }
              );

              routeLayerGroupRef.current.addLayer(polyline);
              polyline.bringToFront();
            });
        }
      });

      // Fit map bounds to show the active route if there is one
      if (activeRouteId && allCoords.length >= 2) {
        setTimeout(() => {
          map.fitBounds(allCoords, { padding: [50, 50], maxZoom: 13 });
        }, 100);
      }
    }
  }, [mapMode, activeRouteId]);

  return (
    <div className="relative w-full h-[520px] border border-slate-200 bg-slate-100 overflow-hidden rounded-xl">
      {isLoadingGeo && (
        <div className="absolute inset-0 bg-white/90 z-30 flex items-center justify-center font-mono text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <Compass size={18} className="animate-spin text-primary-600" />
            <span>Memuat WebGIS & GeoJSON Wilayah Banjarnegara...</span>
          </div>
        </div>
      )}

      {/* Mode Controls Bar */}
      <div className="absolute top-3 left-3 z-20 bg-white border border-slate-200 rounded-lg p-2 flex flex-wrap items-center gap-2 shadow-sm">
        <span className="font-mono text-[10px] font-semibold text-slate-500 flex items-center gap-1 px-1">
          <Layers size={12} /> Layer:
        </span>
        {["tps", "carrying", "routes"].map((mode) => (
          <button
            key={mode}
            onClick={() => setMapMode(mode)}
            className={`font-mono text-[10px] font-semibold uppercase px-2.5 py-1 rounded-md transition cursor-pointer ${
              mapMode === mode
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {mode === "tps" ? "TPS Choropleth" : mode === "carrying" ? "Carrying Cap." : "Rute Tematik"}
          </button>
        ))}

        <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-2">
          <input
            type="checkbox"
            id="show-roads"
            checked={showRoads}
            onChange={(e) => setShowRoads(e.target.checked)}
            className="cursor-pointer h-3 w-3 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
          />
          <label htmlFor="show-roads" className="font-mono text-[9px] font-bold text-slate-700 uppercase cursor-pointer select-none">
            Jejaring Jalan
          </label>
        </div>

        <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-2">
          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase">Basemap:</span>
          {[
            { id: "street", label: "Esri Street" },
            { id: "satellite", label: "Satelit" },
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setBasemapType(b.id)}
              className={`font-mono text-[9px] font-bold uppercase px-2 py-1 rounded-md transition cursor-pointer ${
                basemapType === b.id
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredInfo && (
        <div className="absolute bottom-3 left-3 z-20 bg-slate-900 text-white border border-slate-700 rounded-lg p-3 font-mono text-xs max-w-[260px] space-y-1.5 shadow-lg animate-fade-in">
          <div className="font-semibold text-primary-400 border-b border-slate-700 pb-1 uppercase text-[10px] tracking-wider">
            Kecamatan {hoveredInfo.name}
          </div>
          <div className="flex justify-between text-[11px]">
            <span>TPS:</span>
            <span className="font-bold text-amber-400">{hoveredInfo.tps}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Kunjungan:</span>
            <span className="font-bold">{formatNumber(hoveredInfo.pengunjung)}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Retribusi PAD:</span>
            <span className="font-bold text-emerald-400">{formatShortRupiah(hoveredInfo.pad)}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Kapasitas:</span>
            <span className="font-bold">{hoveredInfo.risk}</span>
          </div>
        </div>
      )}

      {/* Map Legend Widget */}
      <div className="absolute top-3 right-3 z-20 bg-white/95 border border-slate-200 rounded-lg p-2.5 font-mono text-[10px] space-y-1.5 max-w-[200px] shadow-sm">
        <div className="font-semibold uppercase border-b border-slate-200 pb-1 text-slate-800 flex items-center justify-between text-[10px]">
          <span>LEGENDA</span>
          <Info size={12} className="text-slate-400" />
        </div>
        {mapMode === "tps" && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#2563eb] rounded-sm"></span>
              <span>TPS High (&gt;85)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#60a5fa] rounded-sm"></span>
              <span>TPS Medium (65-85)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#ef4444] rounded-sm"></span>
              <span>TPS Low (&lt;65)</span>
            </div>
          </div>
        )}
        {mapMode === "carrying" && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#dc2626] rounded-sm"></span>
              <span>Risiko Tinggi (&gt;85%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#f59e0b] rounded-sm"></span>
              <span>Risiko Sedang (60-85%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#10b981] rounded-sm"></span>
              <span>Aman (&lt;60%)</span>
            </div>
          </div>
        )}
        <div className="pt-1 border-t border-slate-200 text-[9px] text-slate-500">
          • Pin = Objek Wisata Utama<br />• Garis Putus = Rute Tematik
        </div>
      </div>

      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
