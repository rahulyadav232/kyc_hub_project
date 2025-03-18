// import React, { useState, useEffect } from "react";
// import { Table, Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./ProductDetails.css";

// const ProductDetails = ({ compareProducts, setCompareProducts }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://dummyjson.com/products").then((res) => {
//       setProducts(res.data.products);
//       setLoading(false);
//     });
//   }, []);

//   const handleCompare = (product) => {
//     if (compareProducts.length < 4 && !compareProducts.some((p) => p.id === product.id)) {
//       setCompareProducts([...compareProducts, product]);
//       navigate("/compare"); 
//     }
//   };

//   const columns = [
//     { title: "Title", dataIndex: "title", sorter: (a, b) => a.title.localeCompare(b.title) },
//     { title: "Brand", dataIndex: "brand" },
//     { title: "Price ($)", dataIndex: "price", sorter: (a, b) => a.price - b.price },
//     { title: "Category", dataIndex: "category" },
//     { title: "Image", dataIndex: "thumbnail", render: (url) => <img src={url} alt="product" width={50} /> },
//     {
//       title: "Compare",
//       render: (_, product) => (
//         <Button
//           type="primary"
//           disabled={compareProducts.some((p) => p.id === product.id)}
//           onClick={() => handleCompare(product)}
//         >
//           Compare
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="product-table">
//       <Table columns={columns} dataSource={products} rowKey="id" loading={loading} pagination={{ pageSize: 5 }} />
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = ({ compareProducts, setCompareProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  const handleCompare = (product) => {
    if (compareProducts.length < 4 && !compareProducts.some((p) => p.id === product.id)) {
      setCompareProducts([...compareProducts, product]);
      navigate("/compare");
    }
  };

  const isCompared = (id) => compareProducts.some((p) => p.id === id);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <span className={isCompared(record.id) ? "highlight" : ""}>{text}</span>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (text, record) => (
        <span className={isCompared(record.id) ? "highlight" : ""}>{text}</span>
      ),
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => (
        <span className={isCompared(record.id) ? "highlight" : ""}>${text}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) => (
        <span className={isCompared(record.id) ? "highlight" : ""}>{text}</span>
      ),
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      render: (url, record) => (
        <img
          src={url}
          alt="product"
          width={50}
          className={isCompared(record.id) ? "highlight-img" : ""}
        />
      ),
    },
    {
      title: "Compare",
      render: (_, product) => (
        <Button
          type="primary"
          disabled={isCompared(product.id)}
          onClick={() => handleCompare(product)}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="product-table">
      <Table columns={columns} dataSource={products} rowKey="id" loading={loading} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ProductDetails;
