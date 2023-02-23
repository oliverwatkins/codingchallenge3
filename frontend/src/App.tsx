import * as React from 'react';

import './App.css';
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_ORDERS = gql`
query GetAllOrders {
    getOrders {
      employeeid
      id
      state
    }
  }
`;

// const GET_ORDERS = gql`
//   {
//     orders {
//       employeeid
//       id
//       state
//     }
//   }
// `;


const CREATE_ORDER = gql`
  mutation CreateOrder($orderInput: OrderInput) {
    createOrder(orderInput: $orderInput) {
      state
      employeeid
    }
  }
`;



function OrderList() {

  // const [mutateFunction, { data: data2 , loading: loading2 , error: error2 }] = useMutation(ADD_TODO);
  // const [addTodo, { data: data3, loading: loading3, error: error3 }] = useMutation(ADD_TODO);

  const { loading, error, data } = useQuery(GET_ORDERS);
  const [createOrder, order] = useMutation(CREATE_ORDER);

  let butClick = (b) => {
    // addTodo({ variables: { type: b.value } });
    // alert(JSON.stringify(b))
  }

  const createClick = () => {
    createOrder({
      variables: { orderInput: {} },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <div><button onClick={()=> createClick()}>change</button><table> {data.getOrders.map(({ id, state }) => (
              <tr key={id}>
                  <td>{id}</td>
                  <td>{state}</td>
                  <td><button onClick={()=> butClick(data.orders[id])}>change</button></td>
              </tr>
        ))}
    </table>
  </div>
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <OrderList />
      </header>
    </div>
  );
}

export default App;
