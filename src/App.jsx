import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CompareProducts from "./components/CompareProducts/CompareProducts";
import "./App.css"; 

const App = () => {
  const [compareProducts, setCompareProducts] = useState([]);

  return (
    <Router>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="sidebar-content-wrapper">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <ProductDetails
                    compareProducts={compareProducts}
                    setCompareProducts={setCompareProducts}
                  />
                }
              />
              <Route
                path="/compare"
                element={
                  <CompareProducts
                    compareProducts={compareProducts}
                    setCompareProducts={setCompareProducts}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

