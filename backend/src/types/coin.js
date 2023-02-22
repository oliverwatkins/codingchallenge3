// graphQL wrapper
const {gql} = require("apollo-server");
import { ggl } from '@apollo/server';
// this graphlQL wrapper basically lets us create a graphQL schema which will be interpreted from a javascript string
module.exports = gql`
    type ERC20Coin{
        id: ID!
        name: String!
    }
    type Query{
        coins: [ERC20Coin]
    }
    input CreateERC20CoinInput{
        name: String!
    }
    input UpdateERC20CoinInput{
        name: String
    }
    type DeletePayload{
        id: ID!
    }
    type Mutation{
        createCoin(input: CreateERC20CoinInput!): ERC20Coin!
        updateCoin(id: ID, input: UpdateERC20CoinInput!): ERC20Coin!
        deleteCoin(id: ID): DeletePayload!
    }
`;