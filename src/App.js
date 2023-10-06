import "./App.css";
import Footer from "./component/Footer/Footer";
import Nav from "./component/Header/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./component/SignUp/SignUp";
import PrivateComponent from "./component/PrivateComponent/PrivateComponent";
import Login from "./component/Login/Login";
import AddProduct from "./component/Product/AddProduct";
import ProductList from "./component/Product/ProductList";
import UpdateProduct from "./component/Product/UpdateProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1> Logout Component </h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
