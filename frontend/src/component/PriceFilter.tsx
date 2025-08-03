type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
  };
  
  const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-2">
        <h4 className="text-md font-semibold mb-4 text-blue-700">Max Price</h4>
        <select
          className="p-3 border border-blue-200 rounded-lg w-full bg-blue-50 text-blue-900 font-medium shadow-sm focus:ring-2 focus:ring-blue-400 transition"
          value={selectedPrice ?? ""}
          onChange={(event) =>
            onChange(
              event.target.value ? parseInt(event.target.value) : undefined
            )
          }
        >
          <option value="">Select Max Price</option>
          {[50, 100, 200, 300, 500].map((price) => (
            <option key={price} value={price}>
              ₹{price}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default PriceFilter;