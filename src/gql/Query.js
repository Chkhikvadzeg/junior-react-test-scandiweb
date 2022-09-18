import { gql } from "@apollo/client";

export const GET_GEN_3 = gql`
  query getGen3 {
    product(id: "apple-airpods-pro") {
      name 
      brand
      gallery
      description
    }
    
  }
`;