import styled, { keyframes } from "styled-components";

interface Spinnerprops {
  my?: string;
}

const Spinner: React.FC<Spinnerprops> = ({ my = "my-10" }) => {
  return (
    <div className={`text-center flex items-center justify-center ${my}`}>
      <LoadingSpinner className="border-4 border-gray-200 border-t-lime-500" />
    </div>
  );
};

export default Spinner;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotateAnimation} 1s linear infinite;
`;
