const filters = ["popular destinations", "price: low → high", "price: high → low"];

export default function FilterDropdown({
  value,
  onChange
}: { value: string; onChange: (f: string) => void }) {
  return (
    <div className="w-48 mx-auto mb-6">
      <select
        className="w-full border rounded px-3 py-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {filters.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
    </div>
  );
}
