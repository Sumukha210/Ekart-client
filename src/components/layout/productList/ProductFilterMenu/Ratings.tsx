import { AiFillStar } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

interface IRatings {
  rating: number;
  handleRating?: () => void;
  showUpText?: boolean;
  selectedRating: null | number;
  className?: string;
}

const Ratings: React.FC<IRatings> = ({ rating, selectedRating, handleRating = () => {}, showUpText = true, className }) => {
  const ratingList: React.JSX.Element[] = [];

  for (let i = 1; i <= 5; i++) {
    ratingList.push(
      <AiFillStar
        key={i}
        className={twMerge(`h-4 w-4 ${i <= rating ? (rating === (selectedRating && selectedRating) ? "text-yellow-500" : "text-grey") : "text-gray-400"}`)}
      />
    );
  }

  return (
    <>
      <div className={twMerge(`flex items-center w-3/6 cursor-pointer ${className}`)} onClick={handleRating}>
        <div className="flex items-center">{ratingList}</div>
        {showUpText && <h6 className="font-medium ml-3 text-gray-600 up capitalize">& up</h6>}
      </div>
    </>
  );
};

export default Ratings;
