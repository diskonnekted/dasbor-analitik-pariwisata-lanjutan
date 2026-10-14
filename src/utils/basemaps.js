import L from "leaflet";

/**
 * Definisi basemap ESRI ArcGIS Online.
 * Template URL Esri menggunakan urutan {z}/{y}/{x} (level/row/column).
 */
export const ESRI_BASEMAPS = {
  street: {
    label: "Street",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution:
        'Basemap &copy; <a href="https://www.esri.com/">Esri</a>, HERE, Garmin, OSM contributors | Open Data Banjarnegara',
      maxZoom: 19,
    },
  },
  satellite: {
    label: "Satelit",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution:
        'Imagery &copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics | Open Data Banjarnegara',
      maxZoom: 19,
    },
  },
};

/**
 * Membuat instance L.tileLayer basemap ESRI.
 * @param {"street"|"satellite"} type
 * @returns {L.TileLayer}
 */
export function createEsriBasemap(type = "street") {
  const cfg = ESRI_BASEMAPS[type] || ESRI_BASEMAPS.street;
  return L.tileLayer(cfg.url, cfg.options);
}

/**
 * Mengganti basemap aktif pada peta: layer baru dipasang dulu
 * (agar tidak ada flash kosong), lalu layer lama dilepas.
 * @param {L.Map} map
 * @param {L.TileLayer|null} currentLayer
 * @param {"street"|"satellite"} type
 * @returns {L.TileLayer} layer baru
 */
export function swapEsriBasemap(map, currentLayer, type) {
  const next = createEsriBasemap(type);
  next.addTo(map);
  if (currentLayer) map.removeLayer(currentLayer);
  return next;
}
