import { gql } from "@apollo/client";

export const EDIT_USER = gql`
  mutation EditUser($data: EditUserInput!) {
    editUser(data: $data) {
      id
      name
      email
    }
  }
`;
