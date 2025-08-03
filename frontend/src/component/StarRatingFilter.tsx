import { AiFillStar } from "react-icons/ai";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-4 text-blue-700">Property Rating</h4>
      <div className="flex flex-col gap-2">
        {["5", "4", "3", "2", "1"].map((star) => (
          <label
            key={star}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition 
              ${selectedStars.includes(star) ? "bg-blue-50 border border-blue-200 shadow" : "hover:bg-blue-50"}
            `}
          >
            <input
              type="checkbox"
              className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onChange}
            />
            <span className="flex items-center gap-1 font-medium text-blue-900">
              {Array.from({ length: Number(star) }).map((_, i) => (
                <AiFillStar key={i} className="text-yellow-400 text-lg" />
              ))}
              <span className="ml-2 text-sm text-blue-700">{star} Star{star !== "1" && "s"}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;