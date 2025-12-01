// import { useState } from "react";
// import "./App.css";
// // import BasicTable from "./table";
// import CheckboxLabels from "./filter";
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<CheckboxLabels />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// // <>
// //     {/* <BrowserRouter>
// //       <Routes>
// //         <Route path="/form" element={<Form />} />

// //         <CheckboxLabels />
// //         <DataTable />
// //         <Form />
// //       </Routes>
// //     </BrowserRouter> */}
// //     <CheckboxLabels />
// //     <DataTable />
// //     {/* <Form /> */}
// //   </>

import { useState } from "react";
import "./App.css";
// import BasicTable from "./table";
// import CheckboxLabels from "./Filter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogAnalyserUi from "./component/LogAnalyserUi";
import Form from "./Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogAnalyserUi />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
