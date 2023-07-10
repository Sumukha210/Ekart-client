import { secondaryFont } from "@/lib/fonts";

interface FetchErrorMessageprops {
  isError: boolean;
  handleRefetch: () => void;
}

const FetchErrorMessage: React.FC<FetchErrorMessageprops> = ({ isError, handleRefetch }) => {
  return (
    <>
      {isError && (
        <div className="text-center my-8">
          <h3 className={`${secondaryFont.className} text-center text-3xl text-grey mb-4`}>Failed to fetch products</h3>{" "}
          <button className="bg-accent px-5 py-3 text-sm font-semibold border" onClick={handleRefetch}>
            Refetch Products
          </button>
        </div>
      )}
    </>
  );
};

export default FetchErrorMessage;
