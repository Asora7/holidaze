// src/pages/Home.tsx
import { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Hero from '../components/Home/Hero';
import SearchBar from '../components/Home/SearchBar';
import LocationSelector from '../components/Home/LocationSelector';
import FilterDropdown, { FILTER_OPTIONS } from '../components/Home/FilterDropdown';
import VenueGrid from '../components/VenueGrid';
import { fetchAllVenues } from '../api/venuesApi';

const DESTINATIONS = ['Oslo', 'Amsterdam', 'Thailand', 'Spain'];

export default function Home() {
  const [venues, setVenues]     = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [location, setLocation] = useState('all');
  const [filter, setFilter]     = useState(FILTER_OPTIONS[0]);
  const [query, setQuery]       = useState('');

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
      .then(all => {
        const filtered = all.filter(v => {
          const nameMatch = v.name?.toLowerCase().includes(q);
          const descMatch = v.description?.toLowerCase().includes(q);
          const cityMatch = v.location?.city?.toLowerCase().includes(q);
          return nameMatch || descMatch || cityMatch;
        });
        setVenues(filtered);
      })
      .finally(() => setLoading(false));
  }

  const sorted = useMemo(() => {
    const arr = [...venues];
    switch (filter) {
      case 'price: low → high':
        return arr.sort((a, b) => a.price - b.price);
      case 'price: high → low':
        return arr.sort((a, b) => b.price - a.price);
      default:
        return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }, [venues, filter]);

  const displayed = sorted.filter(v => {
    if (location === 'all') return true;
    const city    = v.location?.city || '';
    const country = v.location?.country || '';
    return (
      city.toLowerCase() === location.toLowerCase() ||
      country.toLowerCase() === location.toLowerCase()
    );
  });

  return (
    <>
      <Hero />

      <SearchBar onSearch={handleSearch} />

      {query && (
        <Container className="text-center text-muted my-3">
          Showing {displayed.length} result{displayed.length !== 1 && 's'} for “{query}”
        </Container>
      )}

      {/* New section title */}
      <Container className="mt-5 mb-3">
        <h2 className="h5 fw-semibold">Where do you want to go?</h2>
      </Container>

      <LocationSelector
        options={['all', ...DESTINATIONS]}
        value={location}
        onChange={setLocation}
      />

      <FilterDropdown value={filter} onChange={setFilter} />

      {loading ? (
        <Container className="text-center my-5">
          <p>Loading venues…</p>
        </Container>
      ) : (
        <VenueGrid venues={displayed} />
      )}
    </>
  );
}

