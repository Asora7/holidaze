// src/pages/Home.tsx
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import FilterDropdown from "../components/FilterDropdown";
import VenueGrid from "../components/VenueGrid";
import { fetchAllVenues } from "../api/venuesApi";

export default function Home() {
  const [venues, setVenues]     = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [category, setCategory] = useState("all");
  const [filter, setFilter]     = useState("popular");

  useEffect(() => {
    setLoading(true);
    fetchAllVenues()
      .then((data) => {
        console.log("🔍 fetchAllVenues result:", data);
        // you can also do console.table(data, ["id","name","price"])
        setVenues(data);
      })
      .catch((err) => {
        console.error("❌ Error fetching venues:", err);
      })
      .finally(() => {
        setLoading(false);
        console.log("✅ fetchAllVenues finished");
      });
  }, []);

  const filtered = venues.filter(v =>
    category === "all" ? true : v.meta?.type === category
  );

  return (
    <div>
      <Hero />
      <SearchBar />
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
