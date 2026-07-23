import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { Layers, MapPin, Compass, Info, ShieldAlert, Route } from "lucide-react";
import { kecamatanAnalytics, objekWisata, ruteWisataTematik } from "../data/pariwisataData";
import { calculateTPS, formatNumber, formatShortRupiah } from "../utils/analytics";

// Helper function to color choropleth based on TPS score
function getTPSColor(score) {
  if (!score) return "#9ca3af";
  if (score >= 85) return "#2563eb"; // Deep Blue (Sangat Tinggi)
  if (score >= 75) return "#3b82f6"; // Blue
  if (score >= 65) return "#60a5fa"; // Light Blue
  if (score >= 55) return "#f59e0b"; // Amber (Sedang)
  return "#ef4444"; // Red (Perlu Pengembangan)
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

  const [mapMode, setMapMode] = useState("tps"); // 'tps' | 'carrying' | 'routes'
  const [geoDataKec, setGeoDataKec] = useState(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const [hoveredInfo, setHoveredInfo] = useState(null);

  // Load GeoJSON kecamatan
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

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Banjarnegara Lat/Lng Center
    const map = L.map(mapRef.current, {
      center: [-7.33, 109.70],
      zoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // OpenStreetMap Tile Layer with greyscale/subtle filter
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> | Open Data Banjarnegara',
      maxZoom: 18,
    }).addTo(map);

    markersGroupRef.current = L.layerGroup().addTo(map);
    routeLayerGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update GeoJSON Layer when mode or filter changes
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

        const match = kecamatanAnalytics.find(
          (k) => k.kecamatan.toLowerCase() === kecName
        );

        let fillColor = "#cbd5e1";
        if (mapMode === "tps") {
          const tps = match ? match.tpsScore : 50;
          fillColor = getTPSColor(tps);
        } else if (mapMode === "carrying") {
          fillColor = getRiskColor(match?.carryingCapacityRisk);
        }

        const isFiltered =
          selectedKecamatanFilter &&
          selectedKecamatanFilter.toLowerCase() === kecName;

        return {
          fillColor: fillColor,
          weight: isFiltered ? 3 : 1.5,
          opacity: 1,
          color: isFiltered ? "#141414" : "#141414",
          dashArray: isFiltered ? "" : "3",
          fillOpacity: isFiltered ? 0.75 : 0.45,
        };
      },
      onEachFeature: (feature, layer) => {
        const rawName = feature.properties?.Kecamatan || feature.properties?.Name || "";
        const kecName = rawName.trim();
        const match = kecamatanAnalytics.find(
          (k) => k.kecamatan.toLowerCase() === kecName.toLowerCase()
        );

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              fillOpacity: 0.7,
              weight: 2.5,
              color: "#141414",
            });
            setHoveredInfo({
              name: kecName,
              tps: match ? match.tpsScore : "N/A",
              pengunjung: match ? match.totalPengunjung : 0,
              pad: match ? match.padRetribusi : 0,
              risk: match ? match.carryingCapacityRisk : "Normal",
            });
          },
          mouseout: (e) => {
            geoJsonLayer.resetStyle(e.target);
            setHoveredInfo(null);
          },
          click: () => {
            map.fitBounds(layer.getBounds(), { padding: [20, 20] });
          },
        });
      },
    }).addTo(map);

    geoJsonLayerRef.current = geoJsonLayer;
  }, [geoDataKec, mapMode, selectedKecamatanFilter]);

  // Update Markers for Objek Wisata
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    objekWisata.forEach((item) => {
      // Filter by kecamatan if selected
      if (
        selectedKecamatanFilter &&
        selectedKecamatanFilter.toLowerCase() !== "semua" &&
        item.kecamatan.toLowerCase() !== selectedKecamatanFilter.toLowerCase()
      ) {
        return;
      }

      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="
            background-color: #141414;
            color: #ffffff;
            border: 2px solid #2563eb;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 800;
            padding: 2px 6px;
            box-shadow: 2px 2px 0px #000000;
            white-space: nowrap;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span style="background: #2563eb; width: 6px; height: 6px; border-radius: 50%; display: inline-block;"></span>
            ${item.nama.split(" ")[0]}
          </div>
        `,
        iconSize: [100, 24],
        iconAnchor: [50, 12],
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon });

      const popupContent = document.createElement("div");
      popupContent.className = "p-3 font-mono text-xs space-y-2 bg-white";
      popupContent.innerHTML = `
        <div className="border-b border-[#141414] pb-1">
          <span className="text-[9px] uppercase font-bold text-blue-600 tracking-wider">${item.kategori}</span>
          <h4 className="font-serif italic text-sm font-bold text-[#141414] leading-tight">${item.nama}</h4>
        </div>
        <div className="text-[10px] text-[#555] space-y-0.5">
          <div>📍 ${item.desa}, Kec. ${item.kecamatan}</div>
          <div>👥 <b>${formatNumber(item.pengunjung)}</b> wisatawan/tahun</div>
          <div>💰 PAD: <b>${formatShortRupiah(item.padTahunan)}</b></div>
        </div>
        <button id="btn-detail-${item.id}" class="w-full bg-[#141414] text-white text-[10px] font-bold uppercase py-1 px-2 border border-black shadow-hd hover:bg-blue-600 transition">
          Lihat Analisa Detail →
        </button>
      `;

      marker.bindPopup(popupContent);
      marker.on("popupopen", () => {
        const btn = document.getElementById(`btn-detail-${item.id}`);
        if (btn) {
          btn.onclick = () => onSelectDestinasi(item);
        }
      });

      markersGroupRef.current.addLayer(marker);
    });
  }, [selectedKecamatanFilter, onSelectDestinasi]);

  // Update Thematic Routes Polylines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !routeLayerGroupRef.current) return;

    routeLayerGroupRef.current.clearLayers();

    if (mapMode === "routes" || activeRouteId) {
      const routesToDraw = activeRouteId
        ? ruteWisataTematik.filter((r) => r.id === activeRouteId)
        : ruteWisataTematik;

      routesToDraw.forEach((rute) => {
        // Collect coordinates of attractions in this route
        const points = rute.objekTujuan
          .map((nama) => objekWisata.find((o) => o.nama.includes(nama) || nama.includes(o.nama.split(" ")[0])))
          .filter(Boolean)
          .map((o) => [o.lat, o.lng]);

        if (points.length >= 2) {
          const polyline = L.polyline(points, {
            color: rute.warna,
            weight: 4,
            opacity: 0.85,
            dashArray: "6, 8",
          });

          polyline.bindTooltip(
            `<div class="font-mono text-xs font-bold">${rute.namaRute} (${rute.durasi})</div>`,
            { sticky: true }
          );

          routeLayerGroupRef.current.addLayer(polyline);
        }
      });
    }
  }, [mapMode, activeRouteId]);

  return (
    <div className="relative w-full h-[520px] border-hd-2 shadow-hd bg-[#e5e7eb] overflow-hidden">
      {/* Loading Overlay */}
      {isLoadingGeo && (
        <div className="absolute inset-0 bg-white/90 z-30 flex items-center justify-center font-mono text-xs font-bold text-[#141414]">
          <div className="flex items-center gap-2">
            <Compass size={18} className="animate-spin text-blue-600" />
            <span>Memuat WebGIS & GeoJSON Wilayah Banjarnegara…</span>
          </div>
        </div>
      )}

      {/* Mode Controls Bar */}
      <div className="absolute top-3 left-3 z-20 bg-white border-hd shadow-hd p-2 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] font-extrabold uppercase text-[#747474] flex items-center gap-1 px-1">
          <Layers size={12} /> Mode Layer WebGIS:
        </span>
        <button
          onClick={() => setMapMode("tps")}
          className={`font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 border border-[#141414] transition ${
            mapMode === "tps"
              ? "bg-[#141414] text-white shadow-hd"
              : "bg-white text-[#141414] hover:bg-[#f1f1ef]"
          }`}
        >
          TPS Potential Choropleth
        </button>
        <button
          onClick={() => setMapMode("carrying")}
          className={`font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 border border-[#141414] transition ${
            mapMode === "carrying"
              ? "bg-[#141414] text-white shadow-hd"
              : "bg-white text-[#141414] hover:bg-[#f1f1ef]"
          }`}
        >
          Risiko Carrying Capacity
        </button>
        <button
          onClick={() => setMapMode("routes")}
          className={`font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 border border-[#141414] transition ${
            mapMode === "routes"
              ? "bg-[#141414] text-white shadow-hd"
              : "bg-white text-[#141414] hover:bg-[#f1f1ef]"
          }`}
        >
          Rute Tematik
        </button>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredInfo && (
        <div className="absolute bottom-3 left-3 z-20 bg-[#141414] text-white border border-black shadow-hd-lg p-3 font-mono text-xs max-w-[260px] space-y-1 animate-fade-in">
          <div className="font-bold text-blue-400 border-b border-gray-700 pb-1 uppercase">
            Kecamatan {hoveredInfo.name}
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Tourism Potential Score:</span>
            <span className="font-extrabold text-amber-400">{hoveredInfo.tps}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Total Kunjungan:</span>
            <span className="font-bold">{formatNumber(hoveredInfo.pengunjung)}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Retribusi PAD:</span>
            <span className="font-bold text-emerald-400">{formatShortRupiah(hoveredInfo.pad)}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Beban Kapasitas:</span>
            <span className="font-bold">{hoveredInfo.risk}</span>
          </div>
        </div>
      )}

      {/* Map Legend Widget */}
      <div className="absolute top-3 right-3 z-20 bg-white/95 border-hd shadow-hd p-2.5 font-mono text-[10px] space-y-1.5 max-w-[200px]">
        <div className="font-extrabold uppercase border-b border-[#141414] pb-1 text-[#141414] flex items-center justify-between">
          <span>LEGENDA MAP</span>
          <Info size={12} />
        </div>
        {mapMode === "tps" && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#2563eb] border border-black"></span>
              <span>TPS High (&gt;85)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#60a5fa] border border-black"></span>
              <span>TPS Medium (65-85)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#ef4444] border border-black"></span>
              <span>TPS Low (&lt;65)</span>
            </div>
          </div>
        )}

        {mapMode === "carrying" && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#dc2626] border border-black"></span>
              <span>Risiko Tinggi (Beban &gt;85%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#f59e0b] border border-black"></span>
              <span>Risiko Sedang (Beban 60-85%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 inline-block bg-[#10b981] border border-black"></span>
              <span>Aman / Optimal (&lt;60%)</span>
            </div>
          </div>
        )}

        <div className="pt-1 border-t border-gray-200 text-[9px] text-[#666]">
          • Pin = Objek Wisata Utama
          <br />• Garis Putus = Rute Tematik
        </div>
      </div>

      {/* Leaflet DOM Mounting Container */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
