import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      description
      type
      amount
      date
      category {
        id
        title
        description
        color
        icon
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($id: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, data: $data) {
      id
      description
      type
      amount
      date
      category {
        id
        title
        description
        color
        icon
      }
    }
  }
`;
