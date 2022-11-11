import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./Containers/DefaultLayout";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<DefaultLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
