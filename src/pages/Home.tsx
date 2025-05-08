// src/pages/Home.tsx
import { useState, useEffect, useMemo } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import FilterDropdown, { FILTER_OPTIONS } from "../components/FilterDropdown";
import VenueGrid from "../components/VenueGrid";
import { fetchAllVenues, searchVenues } from "../api/venuesApi";

export default function Home() {
  const [venues, setVenues]       = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [category, setCategory]   = useState("all");
  const [filter, setFilter]       = useState(FILTER_OPTIONS[0]);
  const [query, setQuery]         = useState("");

  // initial load
  useEffect(() => {
    setLoading(true);
    fetchAllVenues()
      .then(setVenues)
      .finally(() => setLoading(false));
  }, []);

  // search handler (unchanged)
  function handleSearch({ where }: { where: string }) {
    setQuery(where);
    setLoading(true);
    const call = where.trim() ? searchVenues(where) : fetchAllVenues();
    call
      .then(setVenues)
      .finally(() => setLoading(false));
  }

  // 1) sort according to filter
  const sorted = useMemo(() => {
    const arr = [...venues];
    switch (filter) {
      case "price: low → high":
        return arr.sort((a, b) => a.price - b.price);
      case "price: high → low":
        return arr.sort((a, b) => b.price - a.price);
      case "popular destinations":
      default:
        // assume venues have a .rating number
        return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }, [venues, filter]);

  // 2) then filter by category
  const displayed = sorted.filter(v =>
    category === "all" ? true : v.meta?.type === category
  );

  return (
    <div>
      <Hero />
      <SearchBar onSearch={handleSearch} />

      {query && (
        <p className="text-center my-2 text-sm text-gray-600">
          Showing {displayed.length} result{displayed.length!==1 && "s"} for “{query}”
        </p>
      )}

      <CategorySelector value={category} onChange={setCategory} />
      <FilterDropdown value={filter} onChange={setFilter} />

      {loading
        ? <p className="text-center my-8">Loading venues…</p>
        : <VenueGrid venues={displayed} />
      }
    </div>
  );
}
