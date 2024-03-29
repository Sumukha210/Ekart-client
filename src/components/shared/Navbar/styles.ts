import Link from "next/link";
import styled from "styled-components";

export const SearchBar = styled.div`
  input {
    &::placeholder {
      font-size: 14px;
      color: darkgray;
    }
  }
`;

export const Logo = styled(Link)`
  &::after {
    content: "";
    position: absolute;
    left: -10px;
    top: -5%;
    bottom: -5%;
    height: 110%;
    width: 70%;
    z-index: -1;
  }
`;

export const Ul = styled.ul`
  @media (max-width: 768px) {
    position: absolute;
    top: -60vh;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    z-index: 30;
    height: 300px;
    padding-inline: 8rem;

    flex-direction: column;
    justify-content: center;
    transition: top 0.5s ease-in;

    &.active {
      top: 60px;
      transition: top 0.5s ease-in;
    }
  }
`;
