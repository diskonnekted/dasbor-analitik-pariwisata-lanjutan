import { useState, useMemo, useEffect, useRef } from "react";
import L from "leaflet";
import {
  Search,
  MapPin,
  ExternalLink,
  Sparkles,
  Layers,
  TrendingUp,
  Tag,
  Compass,
  Database,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Panel, SectionTitle, StatCard, ChartTooltip } from "./ui";
import {
  additionalDestinationsData,
  additionalDestinationsAll,
  additionalDestinationsKecamatanList,
} from "../data/additionalDestinations";

const CATEGORY_COLORS = {
  "Wisata Alam": "#0284c7",      // Sky Blue
  "Wisata Tirta": "#2563eb",     // Royal Blue
  "Wisata Budaya": "#d97706",    // Amber
  "Agrowisata": "#059669",       // Emerald
  "Desa Wisata": "#7c3aed",      // Purple
  "Wisata Geotermal": "#e11d48",  // Rose
};

const CATEGORY_BG = {
  "Wisata Alam": "bg-sky-50 text-sky-700 border-sky-200",
  "Wisata Tirta": "bg-blue-50 text-blue-700 border-blue-200",
  "Wisata Budaya": "bg-amber-50 text-amber-700 border-amber-200",
  "Agrowisata": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Desa Wisata": "bg-purple-50 text-purple-700 border-purple-200",
  "Wisata Geotermal": "bg-rose-50 text-rose-700 border-rose-200",
};

function getCategoryWatermark(kategori) {
  const commonClasses = "absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-15 pointer-events-none transform rotate-12 transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110";

  switch (kategori) {
    case "Wisata Alam":
      // Mountain SVG
      return (
        <svg className={`${commonClasses} text-sky-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 20L8.5 7L15 20H2Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20L16.5 11L21 20H12Z" />
        </svg>
      );
    case "Wisata Tirta":
      // Water Waves SVG
      return (
        <svg className={`${commonClasses} text-blue-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 17c5-5 5 5 10 0s5-5 10 0M2 11c5-5 5 5 10 0s5-5 10 0M2 5c5-5 5 5 10 0s5-5 10 0" />
        </svg>
      );
    case "Wisata Budaya":
      // Temple / Landmark SVG
      return (
        <svg className={`${commonClasses} text-amber-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 10V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5M7 21v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6" />
        </svg>
      );
    case "Agrowisata":
      // Leaf SVG
      return (
        <svg className={`${commonClasses} text-emerald-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C12 22 20 18 20 12C20 6.5 15.5 2 12 2C8.5 2 4 6.5 4 12C4 18 12 22 12 22Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20" />
        </svg>
      );
    case "Desa Wisata":
      // Home / Tent SVG
      return (
        <svg className={`${commonClasses} text-purple-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h3m10-11v11a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
        </svg>
      );
    case "Wisata Geotermal":
      // Flame / Heat SVG
      return (
        <svg className={`${commonClasses} text-rose-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        </svg>
      );
    default:
      // Compass SVG
      return (
        <svg className={`${commonClasses} text-slate-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
  }
}

export function AdditionalDestinationsView() {
  const [query, setQuery] = useState("");
  const [selectedKec, setSelectedKec] = useState("Semua");
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [expandedKec, setExpandedKec] = useState(null);

  const q = query.toLowerCase();

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerGroupRef = useRef(null);
  
  const [geoDataDesa, setGeoDataDesa] = useState(null);
  const villageLayerRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(11);

  // Fetch village GeoJSON boundary on load
  useEffect(() => {
    fetch("/peta_desa.geojson")
      .then(res => res.json())
      .then(data => setGeoDataDesa(data))
      .catch(err => console.error("Gagal membaca peta_desa.geojson", err));
  }, []);

  // Initialize WebGIS Map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-7.38, 109.65],
      zoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> | Open Data Banjarnegara',
      maxZoom: 18,
    }).addTo(map);

    // Track zoom level changes
    map.on("zoomend", () => {
      setZoomLevel(map.getZoom());
    });

    markersLayerGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Draw village boundaries on the map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !geoDataDesa) return;

    if (villageLayerRef.current) {
      map.removeLayer(villageLayerRef.current);
    }

    const layer = L.geoJSON(geoDataDesa, {
      style: {
        color: "#94a3b8",
        weight: 0.8,
        opacity: 0.35,
        fillColor: "transparent",
        fillOpacity: 0
      },
      interactive: false
    }).addTo(map);

    layer.bringToBack();
    villageLayerRef.current = layer;
  }, [geoDataDesa]);

  const kategoriList = useMemo(() => {
    const cats = new Set(additionalDestinationsAll.map((d) => d.kategori));
    return ["Semua", ...cats];
  }, []);

  // Filtered destinations list
  const filteredData = useMemo(() => {
    return additionalDestinationsData
      .map((kec) => {
        const filteredDest = kec.desaWisata.filter((d) => {
          const matchQuery = !q || d.nama.toLowerCase().includes(q) || d.desa.toLowerCase().includes(q);
          const matchKec = selectedKec === "Semua" || kec.kecamatan === selectedKec;
          const matchKat = selectedKategori === "Semua" || d.kategori === selectedKategori;
          return matchQuery && matchKec && matchKat;
        });
        return filteredDest.length > 0 ? { ...kec, desaWisata: filteredDest } : null;
      })
      .filter(Boolean);
  }, [q, selectedKec, selectedKategori]);

  const visibleDestinations = useMemo(() => {
    return filteredData.flatMap((kec) =>
      kec.desaWisata.map((d) => ({ ...d, kecamatan: kec.kecamatan }))
    );
  }, [filteredData]);

  // Spatial clustering algorithm (dynamic threshold based on zoom level)
  const clusters = useMemo(() => {
    const list = visibleDestinations;
    const result = [];
    
    // Dynamic distance threshold that shrinks exponentially as zoom increases
    const threshold = Math.max(0.0001, 0.035 * Math.pow(0.55, zoomLevel - 11));
    const visited = new Set();

    for (let i = 0; i < list.length; i++) {
      if (visited.has(i)) continue;

      const p1 = list[i];
      const cluster = [p1];
      visited.add(i);

      for (let j = i + 1; j < list.length; j++) {
        if (visited.has(j)) continue;

        const p2 = list[j];
        const dist = Math.sqrt(Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2));
        if (dist < threshold) {
          cluster.push(p2);
          visited.add(j);
        }
      }

      if (cluster.length === 1) {
        result.push({
          type: "point",
          lat: p1.lat,
          lng: p1.lng,
          data: p1
        });
      } else {
        const avgLat = cluster.reduce((sum, p) => sum + p.lat, 0) / cluster.length;
        const avgLng = cluster.reduce((sum, p) => sum + p.lng, 0) / cluster.length;
        result.push({
          type: "cluster",
          lat: avgLat,
          lng: avgLng,
          data: cluster,
          count: cluster.length
        });
      }
    }

    return result;
  }, [visibleDestinations, zoomLevel]);

  // Update map markers when clusters change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerGroupRef.current) return;

    markersLayerGroupRef.current.clearLayers();

    const categoryEmojis = {
      "Wisata Alam": "🏔️",
      "Wisata Tirta": "🏄",
      "Wisata Budaya": "🏛️",
      "Agrowisata": "🌾",
      "Desa Wisata": "🎭",
      "Wisata Geotermal": "♨️",
    };

    clusters.forEach((c) => {
      if (c.type === "point") {
        const item = c.data;
        const emoji = categoryEmojis[item.kategori] || "📍";

        const customIcon = L.divIcon({
          className: "additional-map-marker",
          html: `
            <div style="
              width: 28px;
              height: 28px;
              background: #2563eb;
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 4px rgba(0,0,0,0.25);
              font-size: 13px;
              cursor: pointer;
            ">
              <span>${emoji}</span>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([c.lat, c.lng], { icon: customIcon });

        const catColor = CATEGORY_COLORS[item.kategori] || "#475569";
        const popupContent = `
          <div style="min-width:220px; font-family:'Inter',sans-serif; font-size:12px; margin:-4px -1px -4px -1px; overflow:hidden; border-radius:12px;">
            <div style="background:${catColor}; color:white; padding:10px 12px; border-top-left-radius:10px; border-top-right-radius:10px;">
              <span style="font-size:8.5px; text-transform:uppercase; font-weight:700; background:rgba(255,255,255,0.25); padding:2px 5px; border-radius:9999px; letter-spacing:0.05em; display:inline-block; margin-bottom:4px;">
                ${emoji} ${item.kategori}
              </span>
              <h4 style="font-size:12.5px; font-weight:800; color:white; margin:0; line-height:1.3; text-shadow:0 1px 2px rgba(0,0,0,0.15);">${item.nama}</h4>
            </div>
            <div style="padding:10px 12px; background:white; border-bottom-left-radius:10px; border-bottom-right-radius:10px; border:1px solid #e2e8f0; border-top:none;">
              <div style="display:flex; align-items:center; gap:4px; color:#475569; font-size:10.5px; margin-bottom:6px;">
                <span>📍</span>
                <span>Desa <b>${item.desa}</b>, Kec. ${item.kecamatan}</span>
              </div>
              <p style="margin:8px 0 0 0; padding-top:6px; border-top:1px solid #f1f5f9; color:#64748b; font-size:11px; line-height:1.45; font-style:italic;">
                "${item.deskripsi}"
              </p>
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);
        markersLayerGroupRef.current.addLayer(marker);
      } else {
        // Render cluster marker
        const customIcon = L.divIcon({
          className: "additional-cluster-marker",
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background: #1e293b;
              border: 2px solid #fbbf24;
              color: #fbbf24;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 6px rgba(0,0,0,0.3);
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
            ">
              <span>${c.count}</span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([c.lat, c.lng], { icon: customIcon });

        // Hover tooltip listing destinations in cluster
        const namesList = c.data.map(p => `• ${p.nama} (${p.desa})`).join("<br/>");
        marker.bindTooltip(
          `<div style="font-family:'Inter',sans-serif; font-size:10px; line-height:1.4; padding:6px; max-height:150px; overflow-y:auto; background:white; border-radius:6px;">
            <b style="color:#1e293b; display:block; border-bottom:1px solid #e2e8f0; margin-bottom:4px; padding-bottom:2px;">${c.count} Titik Wisata:</b>
            ${namesList}
           </div>`,
          { sticky: true }
        );

        // Click cluster to zoom/fit bounds
        marker.on("click", () => {
          const coords = c.data.map(p => [p.lat, p.lng]);
          map.fitBounds(coords, { padding: [40, 40], maxZoom: 14 });
        });

        markersLayerGroupRef.current.addLayer(marker);
      }
    });

  }, [clusters]);

  // Auto-zoom map bounds ONLY when filtered data changes (e.g. search query, kecamatan, category dropdowns)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || visibleDestinations.length === 0) return;

    const coords = visibleDestinations.map(p => [p.lat, p.lng]);
    const timer = setTimeout(() => {
      map.fitBounds(coords, { padding: [40, 40], maxZoom: 13 });
    }, 150);

    return () => clearTimeout(timer);
  }, [visibleDestinations]);

  // Total and visible statistics
  const totalDestinations = additionalDestinationsAll.length;
  const totalKecamatan = additionalDestinationsData.length;

  const currentVisibleCount = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.desaWisata.length, 0);
  }, [filteredData]);

  // Analytics - Category distribution data
  const categoryChartData = useMemo(() => {
    const counts = {};
    additionalDestinationsAll.forEach((d) => {
      counts[d.kategori] = (counts[d.kategori] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_COLORS[name] || "#64748b",
    }));
  }, []);

  // Analytics - Top Kecamatan by tourist destination count
  const kecamatanChartData = useMemo(() => {
    const counts = {};
    additionalDestinationsAll.forEach((d) => {
      counts[d.kecamatan] = (counts[d.kecamatan] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8
  }, []);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Hero Banner */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white bg-slate-800 px-2.5 py-1 rounded-full">
              DATA SEKTORAL OPEN DATA
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
              Wisata Alternatif & Desa Wisata
            </span>
          </div>
          <h2 className="font-sans text-xl sm:text-2xl font-bold leading-snug text-slate-900">
            Eksplorasi Destinasi Wisata Lainnya & Profil Perdesaan
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Menampilkan data sebaran tempat wisata per desa/kelurahan di 20 kecamatan Kabupaten Banjarnegara. 
            Mencakup potensi wisata lokal, agrowisata, cagar budaya desa, dan destinasi tirta berbasis masyarakat.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 font-mono text-xs shrink-0 space-y-2 min-w-[260px]">
          <div className="flex justify-between items-center text-[11px] font-semibold border-b border-slate-200 pb-1.5">
            <span className="text-slate-600">DATABASE INTEGRASI</span>
            <span className="font-bold text-emerald-700">AKTIF</span>
          </div>
          <div className="text-[10px] text-slate-500 leading-tight">
            Total {totalDestinations} titik wisata terdata di seluruh pelosok desa.
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Titik Wisata Desa" value={totalDestinations} sub="tersebar di tingkat kelurahan" accent="blue" icon={Database} />
        <StatCard label="Destinasi Terfilter" value={currentVisibleCount} sub="sesuai penyaringan pencarian" accent="emerald" icon={TrendingUp} />
        <StatCard label="Kecamatan Terjangkau" value={filteredData.length} sub="dari total 20 kecamatan" accent="amber" icon={Layers} />
        <StatCard label="Variasi Kategori Wisata" value={kategoriList.length - 1} sub="jenis rekreasi perdesaan" accent="purple" icon={Tag} />
      </section>

      {/* Analytics Dashboard Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Bar Chart Kecamatan */}
        <Panel className="lg:col-span-2 p-5">
          <SectionTitle
            index="01"
            title="Kecamatan dengan Wisata Perdesaan Terbanyak"
            subtitle="Peringkat 8 kecamatan dengan konsentrasi sebaran objek wisata desa tertinggi."
          />
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kecamatanChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                <YAxis tick={{ fontSize: 10, fontFamily: "Inter" }} allowDecimals={false} />
                <Tooltip content={<ChartTooltip formatter={(v) => `${v} Destinasi`} />} />
                <Bar dataKey="value" name="Jumlah Objek Wisata" radius={[4, 4, 0, 0]}>
                  {kecamatanChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#1e3a8a" : index < 3 ? "#2563eb" : "#60a5fa"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Chart 2: Category Pie Chart */}
        <Panel className="p-5">
          <SectionTitle
            index="02"
            title="Proporsi Kategori Wisata"
            subtitle="Persentase jenis destinasi wisata desa terdata."
          />
          <div className="h-[180px] w-full flex items-center justify-center mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip formatter={(v) => `${v} Lokasi`} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legends */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mt-3 border-t border-slate-100 pt-3">
            {categoryChartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="flex items-center gap-2 border border-slate-200 px-3 py-2 bg-slate-50 rounded-lg min-w-[280px]">
          <Search size={15} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama destinasi wisata atau nama desa..."
            className="bg-transparent outline-none font-mono text-xs w-full placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase shrink-0">
              Kecamatan:
            </span>
            <select
              value={selectedKec}
              onChange={(e) => setSelectedKec(e.target.value)}
              className="bg-white border border-slate-200 px-2.5 py-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 transition-all cursor-pointer"
            >
              <option value="Semua">Semua Kecamatan</option>
              {additionalDestinationsKecamatanList.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase shrink-0">
              Kategori:
            </span>
            <select
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="bg-white border border-slate-200 px-2.5 py-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 transition-all cursor-pointer"
            >
              {kategoriList.map((kat) => (
                <option key={kat} value={kat}>{kat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* WebGIS Sebaran Wisata Desa Clustered */}
      <Panel>
        <SectionTitle
          index="03"
          title="Peta Sebaran Destinasi Perdesaan & Spasial Clustering"
          subtitle="Titik-titik lokasi dikelompokkan secara cerdas berdasarkan klaster jarak spasial. Klik pada klaster angka untuk memperbesar."
        />
        <div 
          ref={mapRef} 
          id="additional-destinations-map" 
          className="w-full aspect-[4/3] max-h-[520px] rounded-lg border border-slate-200 mt-4 relative z-10 shadow-sm"
        />
      </Panel>

      {/* Grid of Kecamatan & Beautiful Cards */}
      <div className="space-y-4">
        {filteredData.map((kecData) => {
          const isExpanded = expandedKec === kecData.kecamatan;
          return (
            <Panel key={kecData.kecamatan} className="overflow-hidden border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
              <button
                onClick={() => setExpandedKec(isExpanded ? null : kecData.kecamatan)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50/60 transition text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg border border-blue-100">
                    <Compass size={18} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-bold text-slate-900">Kecamatan {kecData.kecamatan}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{kecData.desaWisata.length} Destinasi Lokal Terdata</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {isExpanded ? "Sembunyikan" : "Lihat Detail"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-5 border-t border-slate-100 pt-4 bg-slate-50/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kecData.desaWisata.map((dest, idx) => {
                      const bgStyle = CATEGORY_BG[dest.kategori] || "bg-slate-100 text-slate-700 border-slate-200";
                      return (
                        <div
                          key={idx}
                          className="group relative overflow-hidden bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                        >
                          {getCategoryWatermark(dest.kategori)}
                          <div className="space-y-2 relative z-10">
                            <div className="flex justify-between items-start gap-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${bgStyle}`}>
                                {dest.kategori}
                              </span>
                              <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1 shrink-0 bg-slate-100 px-1.5 py-0.5 rounded">
                                <MapPin size={9} /> Des. {dest.desa}
                              </span>
                            </div>

                            <h4 className="font-sans text-sm font-bold text-slate-950 leading-tight">
                              {dest.nama}
                            </h4>

                            <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                              {dest.deskripsi}
                            </p>
                          </div>

                          <div className="pt-2.5 border-t border-slate-100 space-y-2">
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Fasilitas Tersedia:</span>
                            <div className="flex flex-wrap gap-1">
                              {dest.fasilitas.map((f, i) => (
                                <span key={i} className="text-[9px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
                                  <span className="w-1 h-1 rounded-full bg-emerald-500" /> {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Panel>
          );
        })}
      </div>

      {/* Source Info */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <div className="space-y-1 flex items-start gap-3">
          <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-slate-600 shrink-0">
            <Info size={16} />
          </div>
          <div>
            <span className="font-bold text-slate-800 uppercase block">
              Sumber Data Resmi Pemkab Banjarnegara
            </span>
            <p className="text-[11px] text-slate-500 font-sans mt-0.5">
              Dataset Banyaknya Tempat Wisata per Desa/Kelurahan per Kecamatan. Diintegrasikan langsung dengan platform sektoral pariwisata.
            </p>
          </div>
        </div>
        <a
          href="https://opendata.banjarnegarakab.go.id/"
          target="_blank"
          rel="noreferrer"
          className="bg-slate-900 text-white font-semibold uppercase text-[10px] tracking-wider px-4 py-2.5 flex items-center gap-2 rounded-lg hover:bg-slate-800 transition shrink-0 shadow-sm border border-slate-800"
        >
          Kunjungi Open Data <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
