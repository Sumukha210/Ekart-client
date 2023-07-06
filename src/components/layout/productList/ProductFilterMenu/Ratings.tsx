import { AiFillStar } from "react-icons/ai";

interface IRatings {
  rating: number;
  handleRating: () => void;
  selectedRating: null | number;
}

const Ratings: React.FC<IRatings> = ({ rating, handleRating, selectedRating }) => {
  return (
    <div className="flex items-center w-3/6 cursor-pointer" onClick={handleRating}>
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <AiFillStar
            key={index}
            className={`h-4 w-4 
              ${index + 1 <= rating && rating === selectedRating ? "text-yellow-500" : index + 1 <= rating ? "text-black" : "text-gray-400"}`}
          />
        ))}
      </div>

      <h6 className="font-semibold ml-3 text-gray-600">& up</h6>
    </div>
  );
};

export default Ratings;
