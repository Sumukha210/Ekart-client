import Link from "next/link";
import styled from "styled-components";

export const SearchBar = styled.div`
  input {
    height: 100%;

    &::placeholder {
      font-size: 12px;
      color: darkgray;
    }
  }

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 4%;
    opacity: 0.4;
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

export const NavLink = styled(Link)`
  &::after {
    content: "";
    position: absolute;
    left: 0%;
    bottom: -10px;
    width: 0%;
    height: 4px;
    transition: width 0.5s ease-in;
  }

  &:hover::after {
    width: 100%;
  }
`;
