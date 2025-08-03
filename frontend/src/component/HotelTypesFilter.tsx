import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-4 text-blue-700">Hotel Type</h4>
      <div className="flex flex-col gap-2">
        {hotelTypes.map((hotelType) => (
          <label
            key={hotelType}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition
              ${
                selectedHotelTypes.includes(hotelType)
                  ? "bg-blue-50 border border-blue-200 shadow"
                  : "hover:bg-blue-50"
              }
            `}
          >
            <input
              type="checkbox"
              className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
              value={hotelType}
              checked={selectedHotelTypes.includes(hotelType)}
              onChange={onChange}
            />
            <span className="text-blue-900 font-medium">{hotelType}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypesFilter;