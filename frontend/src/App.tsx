import * as React from 'react';

import './App.css';
import {OrderSection} from "./OrdersSection";
import {UserType} from "./types";

const user: UserType = {
  employeeNo: 123,
  name: "Bob"
}

function App() {
  return (
    <div className="App">
      <header><h1> Orders </h1></header>
      <div> Logged in as : {user.name} </div>
      <OrderSection user={user} />
    </div>
  );
}

export default App;
