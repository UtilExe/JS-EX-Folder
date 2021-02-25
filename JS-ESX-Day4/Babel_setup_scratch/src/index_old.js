import "./style.scss";
import React, { useState } from "react";
import { render } from "react-dom";
import { getUsers } from "./common/usersAPI";

function App() {
    const [state, setState] = useState("CLICK ME");

    return <button onClick={() => setState("CLICKED")}>{state}</button>;
}

render(<App />, document.getElementById("root"));

console.log("Hello webpack!")
getUsers().then(json => console.log(json));

const fancyFunc = () => {
    return [1, 2];
  };
  
  const [a, b] = fancyFunc();