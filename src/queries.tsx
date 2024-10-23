import { gql } from '@apollo/client';

export const GET_ENS_DETAILS = gql`
  query GetEnsDetails($name: String!) {
    domains(where: { name: $name }) {
      id
      name
      owner {
        id
      }
      resolver {
        address
      }
      createdAt
    }
  }
`;
