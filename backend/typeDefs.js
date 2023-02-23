

import {gql} from 'apollo-server'



export default gql`


    type Recipe {
        name: String
        description: String
        createdAt: String
        thumbsUp: Int
        thumbsDown: Int
    }
    
    type Order {
        id: String
        state: String
        employeeid: String
    }
    
    input RecipeInput {
        name: String
        description: String
    }
    input OrderInput {
        state: String
        employeeid: String
    }

    
    type Query {
        recipe(ID: ID!): Recipe!
        getRecipes(amount: Int): [Recipe]
        getOrders(amount: Int): [Order]
        getAllOrders: [Order]
    }
    
    type Mutation {
        createRecipe(recipeInput: RecipeInput): Recipe!
        deleteRecipe(ID: ID!): Boolean
        editRecipe(ID:ID!, recipeInput: RecipeInput): Boolean
        createOrder(orderInput: OrderInput): Order!
    }


`;