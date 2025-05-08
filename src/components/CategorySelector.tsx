const options = ["cabin", "apartment", "villa", "hotel"];

export default function CategorySelector({
  value,
  onChange
}: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex gap-4 my-8 justify-center">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full ${
            value === opt ? "bg-yellow-400 text-white" : "bg-gray-100"
          }`}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  );
}
