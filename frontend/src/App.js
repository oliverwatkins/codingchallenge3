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

  return data.orders.map(({ id, state }) => (
      <div key={id}>
        <p>{id}</p>
        <p>{state}</p>
      </div>
  ));
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
