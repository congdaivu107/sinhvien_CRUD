import TableSV from "./components/TableSV";
import { useState } from "react";
import FormSV from "./components/FormSV";
function App(){
  const handleAddData = (data) => {
    setData([...data, data]);
  };
  return (
    <div>
      <TableSV/></div>
  )
}
export default App;