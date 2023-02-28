import * as React from "react";

import {useMutation, useQuery} from "@apollo/client";
import {GET_ORDERS, UPDATE_ORDER} from "./Queries";
import {ItemType, OrderType, StatusChange, UserType} from "./types";

type Props = {
    user: UserType
}

export function OrderSection(props: Props) {
    const { loading, error, data, refetch } = useQuery(GET_ORDERS);
    const [updateOrder, { loading : loading2, error : error2 }] = useMutation(UPDATE_ORDER);

    console.info("DATA FROM GET ORDERS")
    console.info("" + JSON.stringify(data))


    let onClick = (order) => {
        updateOrder({
            variables: {
                orderInput: {
                    id: order.id,
                    state: order.state,
                    employeeNo: props.user.employeeNo
                },
            },
        });
        refetch()
    }

    if (loading || loading2) return <p>Loading...</p>;
    if (error || error2) return <p>Error : {error ? error.message : error2.message}</p>;

    return <table>
        <tr><th>id</th><th>current state</th><th>customer</th><th>employee</th><th>action</th></tr>
            {data.orders.map((order: OrderType) => {
                return (
                    <>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td className={"status-"+ order.state}>{order.state}</td>
                            <td>{order.customer}</td>
                            <td></td>
                            <td><button onClick={()=> onClick(order)}>{getButtonText(order.state)}</button></td>
                        </tr>
                        <td></td>
                        <td></td>
                        <td>{itemsSection(order.items)}</td>
                        <td></td>
                        <td>{statusChangesSection(order.statusChanges)}</td>
                    </>
                )
            })}
    </table>
}


function itemsSection(items: ItemType[]) {

    let cc = items.map((elem)=> {
      return <tr><td>{elem.description}</td>
          <td>{elem.amount}</td>
      </tr>
    })

    let t = (items.length > 0) ?
        <div>
            <h3>Items</h3>
            <table>
                <tr><th>description</th><th>amount</th></tr>{cc}
            </table>
        </div> : <div></div>
    return t
}

function statusChangesSection(statusChanges: StatusChange[]) {
    let s = statusChanges.map((elem)=> {

        var date = new Date(Number(elem.updatedDate));
        console.log(date.toUTCString())

        return <tr><td>
            {elem.status}
        </td><td></td><td>{date.toUTCString()}</td>
        </tr>
    })
    let t = (statusChanges.length > 0) ? <div><h3>Status Changes</h3>
        <table>
            <tr><th>status changed to</th><th>by employee</th><th>date/time</th></tr>
        {s}
        </table></div> : <div></div>
    return t;
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