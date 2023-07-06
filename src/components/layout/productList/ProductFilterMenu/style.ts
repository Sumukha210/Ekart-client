import styled from "styled-components";

export const SideBar = styled.div`
  transition: left 0.6s ease-in-out;
`;

export const ButtonContainer = styled.div`
  transition: opacity 0.6s ease-in;
  transition-delay: 0.6s;
`;

export const RangeSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  opacity: 0.7;
  height: 10px;
  border-radius: 5px;
  outline: none;
  transition: opacity 0.3s ease-in;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #111111;
    cursor: pointer;
    border-radius: 50%;
  }
`;
