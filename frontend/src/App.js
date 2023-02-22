import * as React from 'react';

import './App.css';
import {gql, useQuery} from "@apollo/client";

const GET_ORDERS = gql`
    query GetOrders {
      orders {
        id
        state
        employeeeId
      }
    }
`;



function OrderList() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

    return <table> {data.orders.map(({ id, state }) => (
                  <tr  key={id}>
                      <td>{id}</td>
                      <td>{state}</td>
                      <td><button>change</button></td>
                  </tr>
        ))}
    </table>
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
