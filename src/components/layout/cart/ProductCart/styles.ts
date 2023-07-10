import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 768px) {
    .table-responsive {
      display: flex;
      flex-direction: column;
    }

    .table-responsive tbody tr,
    .table-responsive tbody td,
    .table-responsive tbody th {
      display: block;
    }

    .table-responsive td,
    .table-responsive th {
      text-align: start;
    }

    .table-responsive tbody tr:has(.productTableData) {
      margin-bottom: 3rem;
    }

    .table-responsive .productTableData {
      padding: 1rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
