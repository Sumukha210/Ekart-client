import styled, { keyframes } from "styled-components";

interface Spinnerprops {
  my?: number;
}

const Spinner: React.FC<Spinnerprops> = ({ my = 10 }) => {
  return (
    <div className={`text-center my-${my}`}>
      <Button disabled className="border-2 border-yellow-500" />
    </div>
  );
};

export default Spinner;

const rotate = keyframes`
 to {
    transform: scale(1.5);
    opacity: 0;
 }
`;

const Button = styled.button`
  height: 40px;
  width: 40px;
  background: black;
  border-radius: 50%;
  opacity: 1;
  animation: ${rotate} 800ms linear infinite;
`;
