import { useState, useEffect, useMemo } from "react";
import { Container, Button } from "react-bootstrap";
import Hero from "../components/Home/Hero";
import SearchBar from "../components/Home/SearchBar";
import LocationSelector from "../components/Home/LocationSelector";
import FilterDropdown, {
  FILTER_OPTIONS,
} from "../components/Home/FilterDropdown";
import VenueGrid from "../components/VenueGrid";
import { fetchAllVenues } from "../api/venuesApi";

const DESTINATIONS = ["Oslo", "Italy", "Australia", "Spain"];
const PAGE_SIZE = 9;

export default function Home() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("all");
  const [filter, setFilter] = useState(FILTER_OPTIONS[0]);
  const [query, setQuery] = useState("");
  const [itemsToShow, setItemsToShow] = useState(PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    fetchAllVenues()
      .then(setVenues)
      .finally(() => setLoading(false));
  }, []);

  function handleSearch({ where }: { where: string }) {
    const q = where.trim().toLowerCase();
    setQuery(where);
    setLoading(true);

    fetchAllVenues()
      .then((all) => {
        const filtered = all.filter((v) => {
          const nameMatch = v.name?.toLowerCase().includes(q);
          const descMatch = v.description?.toLowerCase().includes(q);
          const cityMatch = v.location?.city?.toLowerCase().includes(q);
          const countryMatch = v.location?.country?.toLowerCase().includes(q);
          return nameMatch || descMatch || cityMatch || countryMatch;
        });
        setVenues(filtered);
        setItemsToShow(PAGE_SIZE);
      })
      .finally(() => setLoading(false));
  }

  const sorted = useMemo(() => {
    const arr = [...venues];
    switch (filter) {
      case "price: low → high":
        return arr.sort((a, b) => a.price - b.price);
      case "price: high → low":
        return arr.sort((a, b) => b.price - a.price);
      default:
        return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }, [venues, filter]);

  const displayed = sorted.filter((v) => {
    if (location === "all") return true;
    const city = v.location?.city || "";
    const country = v.location?.country || "";
    return (
      city.toLowerCase() === location.toLowerCase() ||
      country.toLowerCase() === location.toLowerCase()
    );
  });

  const page = displayed.slice(0, itemsToShow);

  return (
    <>
      <Hero />

      <Container className="my-5">
        <SearchBar onSearch={handleSearch} />

        {query && (
          <div className="text-center text-muted my-4">
            Showing {displayed.length} result{displayed.length !== 1 && "s"} for
            “{query}”
          </div>
        )}

        <h2 className="h5 fw-semibold mb-3" style={{ marginTop: "5rem" }}>
          Where do you want to go?
        </h2>

        <div className="mb-5">
          <LocationSelector
            options={["all", ...DESTINATIONS]}
            value={location}
            onChange={setLocation}
          />
        </div>

        <div className="mb-5">
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>

        {loading ? (
          <div className="text-center my-5">
            <p>Loading venues…</p>
          </div>
        ) : (
          <>
            <VenueGrid venues={page} />

            {itemsToShow < displayed.length && (
              <div className="text-center mb-5">
                <Button
                  variant="outline-secondary"
                  onClick={() => setItemsToShow((s) => s + PAGE_SIZE)}
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}
