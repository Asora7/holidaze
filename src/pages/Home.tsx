// src/pages/Home.tsx
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import FilterDropdown from "../components/FilterDropdown";
import VenueGrid from "../components/VenueGrid";
import { fetchAllVenues, searchVenues } from "../api/venuesApi";

export default function Home() {
  const [venues, setVenues]     = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [category, setCategory] = useState("all");
  const [filter, setFilter]     = useState("popular");
  const [query, setQuery]       = useState("");      // track the last search

  // initial load (all venues)
  useEffect(() => {
    loadAll();
  }, []);

  function loadAll() {
    setLoading(true);
    fetchAllVenues()
      .then(data => setVenues(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleSearch({ where }: { where: string; dates: any; guests: number }) {
    setQuery(where);
    if (!where.trim()) {
      // empty search → reload all
      loadAll();
      return;
    }
    setLoading(true);
    searchVenues(where)
      .then(data => setVenues(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  // client-side category filter (if you want to layer that on top of search results)
  const filtered = venues.filter(v =>
    category === "all" ? true : v.meta?.type === category
  );

  return (
    <div>
      <Hero />
      <SearchBar onSearch={handleSearch} />

      {/* you might want to show “Showing X results for ‘query’” */}
      {query && (
        <p className="text-center my-2 text-sm text-gray-600">
          Showing {venues.length} result{venues.length!==1 && "s"} for “{query}”
        </p>
      )}

      <CategorySelector value={category} onChange={setCategory} />
      <FilterDropdown value={filter} onChange={setFilter} />

      {loading ? (
        <p className="text-center my-8">Loading venues…</p>
      ) : (
        <VenueGrid venues={filtered} />
      )}
    </div>
  );
}
