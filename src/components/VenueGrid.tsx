import VenueCard from "./VenueCard";

export default function VenueGrid({ venues }: { venues: any[] }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-16">
      {venues.map(v => (
        <VenueCard key={v.id} venue={v} />
      ))}
    </div>
  );
}
