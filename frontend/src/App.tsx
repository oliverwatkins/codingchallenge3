import * as React from 'react';

import './App.css';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ORDERS, UPDATE_ORDER} from "./Queries";

type OrderType = {
  employeeNo: number
  id: number
  state: string
  description: string
}

type UserType = {
  employeeNo: number
  name: string
}

const user: UserType = {
  employeeNo: 123,
  name: "Bob"
}



function OrderList() {



  const { loading, error, data } = useQuery(GET_ORDERS);

  const [updateOrder, { loading : loading2, error : error2 }] = useMutation(UPDATE_ORDER);

  let butClick = (order) => {
    updateOrder({
      variables: {
        orderInput: {
          id: order.id,
          state: order.state,
          employeeNo: user.employeeNo
        },
      },
    });
  }

  if (loading || loading2) return <p>Loading...</p>;
  if (error || error2) return <p>Error : {error ? error.message : error2.message}</p>;

  return <table> {data.orders.map((order: OrderType) => (
              <tr className={"status-"+ order.state} key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.description}</td>
                  <td>{order.state}</td>
                  <td>{order.employeeNo}</td>
                  <td><button onClick={()=> butClick(order)}>{getButtonText(order.state)}</button></td>
              </tr>
        ))}
    </table>
}

function getButtonText(state: string) {
  switch (state) {
    case "OPEN":
      return "Assign to me"
    case "IN_PROGRESS":
      return "Complete"
    case "COMPLETE":
      return "Re-open"
    default:
      return "???"
  }
}


function App() {
  return (
    <div className="App">
      <header> Orders </header>
      <div> Logged in as : {user.name} </div>
      <OrderList />
    </div>
  );
}

export default App;
