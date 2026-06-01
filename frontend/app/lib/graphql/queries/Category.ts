import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listAllCategories {
      id
      title
      description
      color
      icon
      countTransactions
      totalAmount
    }
  }
`;

export const SUMMARY_CATEGORY = gql`
  query SummaryCategory {
    summaryCategory {
      totalCategories
      mostUsedCategory
    }
  }
`;
