import * as React from 'react';

import './App.css';
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_ORDERS = gql`
    query GetOrders {
      orders {
        id
        state
        employeeeId
      }
    }
`;

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

// Define mutation
const INCREMENT_COUNTER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation IncrementCounter {
    currentValue
  }
`;


type Order = {
  id: number,
  state: string,
  empoyeeid: string
}


function OrderList() {

  // const [mutateFunction, { data: data2 , loading: loading2 , error: error2 }] = useMutation(ADD_TODO);
  const [addTodo, { data: data3, loading: loading3, error: error3 }] = useMutation(ADD_TODO);


  let butClick = (b) => {
    addTodo({ variables: { type: b.value } });
    // alert(JSON.stringify(b))
  }

  const { loading, error, data } = useQuery(GET_ORDERS);


  if (error3) return <p>Error mutating : {error3.message}</p>;


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

    return <table> {data.orders.map(({ id, state }) => (
              <tr key={id}>
                  <td>{id}</td>
                  <td>{state}</td>
                  <td><button onClick={()=> butClick(data.orders[id])}>change</button></td>
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
