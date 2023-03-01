import {gql} from "@apollo/client";

export const GET_ORDERS = gql`
    {
        orders {
            customer
            id
            state
            items {description, amount}, 
            statusChanges {status, updatedDate},
            createdDate
            updatedDate
        }
    }
`;

export const UPDATE_ORDER = gql`
    mutation UpdateOrder($orderInput: UpdateOrderInput!) {
        updateOrder(updateOrderInput: $orderInput) {
            id,
            state
        }
    }
`;
