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
