import {gql} from "@apollo/client";

export const GET_ORDERS = gql`
    {
        orders {
            employeeNo
            description
            id
            state
        }
    }
`;

export const UPDATE_ORDER = gql`
    mutation UpdateOrder($orderInput: UpdateOrderInput!) {
        updateOrder(updateOrderInput: $orderInput) {
            id,
            state,
            employeeNo
        }
    }
`;
