import * as React from 'react';

import './App.css';
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_ORDERS = gql`
  {
    orders {
      employeeNo
      id
      state
    }
  }
`;


const UPDATE_ORDER = gql`
  mutation UpdateOrder($orderInput: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $orderInput) {
#      state
#      name,
      id,
      state,
      employeeNo
    }
  }
`;

// const CREATE_ORDER = gql`
//   mutation CreateOrder($orderInput: OrderInput) {
//     createOrder(createOrderInput: $orderInput) {
//       state
//       employeeid
//     }
//   }
// `;

// const UPDATE_TODO = gql`
//   mutation UpdateTodo($id: ID!, $text: String!) {
//     updateTodo(id: $id, text: $text) {
//       id
//       text
//     }
//   }
// `;




function OrderList() {

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   updateTodo({
  //     variables: {
  //       id: '123', // replace with the actual ID of the todo you want to update
  //       text,
  //     },
  //   });
  //   setText('');
  // }

  // const [mutateFunction, { data: data2 , loading: loading2 , error: error2 }] = useMutation(ADD_TODO);
  // const [addTodo, { data: data3, loading: loading3, error: error3 }] = useMutation(ADD_TODO);

  const { loading, error, data } = useQuery(GET_ORDERS);
  // const [createOrder, order] = useMutation(CREATE_ORDER);

  // const [mutateFunction, { data, loading, error }]
  const [updateOrder, { data: data2, loading : loading2, error : error2 }] = useMutation(UPDATE_ORDER);


  let butClick = (b) => {


    updateOrder({
      variables: {
        orderInput: {
          id: 123,
          state: "asdf",
          employeeNo: 1
        },
      },
    });
    // setText('');


    // updateOrder("");
    // addTodo({ variables: { type: b.value } });
    // alert(JSON.stringify(b))
  }

  const createClick = () => {
    // createOrder({
    //   variables: { orderInput: {} },
    // });
  };

  if (loading || loading2) return <p>Loading...</p>;
  if (error || error2) return <p>Error : {error ? error.message : error2.message}</p>;

  return <div><button onClick={()=> createClick()}>create</button><table> {data.orders.map(({ id, state }) => (
              <tr key={id}>
                  <td>{id}</td>
                  <td>{state}</td>
                  <td><button onClick={()=> butClick(data.orders[id])}>change order</button></td>
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
