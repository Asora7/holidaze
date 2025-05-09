// src/components/LocationSelector.tsx

interface LocationSelectorProps {
  options: string[];
  value: string;
  onChange: (loc: string) => void;
}

export default function LocationSelector({
  options,
  value,
  onChange
}: LocationSelectorProps) {
  return (
    <div className="flex gap-6 justify-center my-8">
      {options.map((loc) => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          className={`rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition p-0 ${
            value === loc ? "ring-4 ring-yellow-400" : ""
          }`}
        >
          <img
            src={`/assets/locations/${loc.toLowerCase()}.jpg`}
            alt={loc}
            className="w-48 h-64 object-cover rounded-t-2xl"
          />
          <div className="bg-white text-center py-2 font-medium">
            {loc}
          </div>
        </button>
      ))}
    </div>
  );
}
