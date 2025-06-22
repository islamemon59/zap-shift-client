import "leaflet/dist/leaflet.css";
import { IoSearch } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
// Fix marker icons (important for Leaflet in React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function FlyToOnSearch({ search, districtData }) {
  const map = useMap(); // gets live Leaflet map instance from context

  useEffect(() => {
    if (!search) return; // nothing typed yet

    // case‑insensitive, partial match (e.g. "farid" → Faridpur)
    const target = districtData.find((d) =>
      d.district.toLowerCase().includes(search.toLowerCase())
    );
    if (!target) return; // district not found – silently ignore

    // Smoothly pan + zoom to the district
    map.flyTo([target.latitude, target.longitude], 11, {
      animate: true,
      duration: 1.2, // seconds
    });
  }, [search, map, districtData]);

  return null; // renders nothing visible
}

const BangladeshMap = ({ districtData }) => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input.trim());
  };
  return (
    <div>
      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 max-w-lg pl-0 p-4"
      >
        <div className="input-group relative w-full">
          <span className="absolute left-3 top-2 z-10">
            <IoSearch size={24} />
          </span>
          <input
            type="text"
            placeholder="Search district..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input input-bordered w-full pl-10 pr-16  outline-none focus:outline-none focus:ring-0 z-0 rounded-full"
          />
          <button
            onClick={handleSubmit}
            className="btn btn-secondary text-primary-content absolute top-0 right-0 rounded-full z-10"
          >
            Search
          </button>
        </div>
      </form>

      <div className="divider"></div>

      {/* 🔸 Sub Title */}
      <h2 className="text-xl font-semibold text-start text-gray-600 mb-6 my-8">
        We deliver almost all over Bangladesh
      </h2>

      <MapContainer
        center={[23.685, 90.3563]} // Bangladesh center
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-[500px] rounded-xl shadow-md border border-gray-300"
      >
        <FlyToOnSearch search={search} districtData={districtData} />
        {/* Basic OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example marker (Dhaka) */}
        {districtData.map((d) => (
          <Marker key={d.district} position={[d.latitude, d.longitude]}>
            <Popup>
              <h3 className="font-bold text-base mb-1">{d.district}</h3>
              <p className="text-sm mb-0">
                Service points: {d.covered_area.join(", ")}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
