// src/pages/Home.tsx
import { useState, useEffect, useMemo } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import LocationSelector from "../components/LocationSelector"; // <- new
import FilterDropdown, { FILTER_OPTIONS } from "../components/FilterDropdown";
import VenueGrid from "../components/VenueGrid";
import { fetchAllVenues, searchVenues } from "../api/venuesApi";

const DESTINATIONS = ["Oslo", "Amsterdam", "Thailand", "Spain"];

export default function Home() {
  const [venues, setVenues]       = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [location, setLocation]   = useState("all");
  const [filter, setFilter]       = useState(FILTER_OPTIONS[0]);
  const [query, setQuery]         = useState("");

  useEffect(() => {
    setLoading(true);
    fetchAllVenues()
      .then(setVenues)
      .finally(() => setLoading(false));
  }, []);

  function handleSearch({ where }: { where: string }) {
    setQuery(where);
    setLoading(true);
    const call = where.trim() ? searchVenues(where) : fetchAllVenues();
    call
      .then(setVenues)
      .finally(() => setLoading(false));
  }

  // sort
  const sorted = useMemo(() => {
    const arr = [...venues];
    switch (filter) {
      case "price: low → high":
        return arr.sort((a, b) => a.price - b.price);
      case "price: high → low":
        return arr.sort((a, b) => b.price - a.price);
      default: // popular
        return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }, [venues, filter]);

  // filter by location pills
  const displayed = sorted.filter((v) => {
    if (location === "all") return true;
    // match either city or country
    const city    = v.location?.city || "";
    const country = v.location?.country || "";
    return (
      city.toLowerCase() === location.toLowerCase() ||
      country.toLowerCase() === location.toLowerCase()
    );
  });

  return (
    <div>
      <Hero />
      <SearchBar onSearch={handleSearch} />

      {query && (
        <p className="text-center text-sm text-gray-600 my-2">
          Showing {displayed.length} result{displayed.length !== 1 && "s"} for “{query}”
        </p>
      )}

      {/* new location selector */}
      <LocationSelector
        options={["all", ...DESTINATIONS]}
        value={location}
        onChange={setLocation}
      />

      <FilterDropdown value={filter} onChange={setFilter} />

      {loading ? (
        <p className="text-center my-8">Loading venues…</p>
      ) : (
        <VenueGrid venues={displayed} />
      )}
    </div>
  );
}
