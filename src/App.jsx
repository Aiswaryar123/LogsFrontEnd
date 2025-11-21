import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BasicTable from "./table";
import CheckboxLabels from "./filter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CheckboxLabels />
      <BasicTable />
    </>
  );
}

export default App;
