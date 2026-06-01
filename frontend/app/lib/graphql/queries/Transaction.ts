import { gql } from "@apollo/client";

export const SUMMARY_TRANSACTION = gql`
  query SummaryTransaction {
    summaryTransaction {
      totalTransactions
      totalBalance
      totalExpenseCurrentMonth
      totalIncomeCurrentMonth
    }
  }
`;

export const LIST_TRANSACTIONS = gql`
  query ListTransactions($data: ListTransactionsInput!) {
    listTransactions(data: $data) {
      limit
      offset
      total
      transactions {
        id
        description
        amount
        date
        type
        category {
          id
          title
          description
          color
          icon
        }
      }
    }
  }
`;
