import React, { useState } from "react";
import { Table, Button, Modal, Card } from "antd";
import axios from "axios";
import "./CompareProducts.css";

const CompareProducts = ({ compareProducts, setCompareProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      setAllProducts(res.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const openModal = () => {
    fetchAllProducts();
    setIsModalOpen(true);
  };

  const handleAddProduct = (product) => {
    if (compareProducts.length < 4 && !compareProducts.some((p) => p.id === product.id)) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const handleRemoveProduct = (id) => {
    const updatedProducts = compareProducts.filter((p) => p.id !== id);
    setCompareProducts(updatedProducts);
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Price ($)", dataIndex: "price" },
    {
      title: "Add",
      render: (_, product) => (
        <Button
          type="primary"
          disabled={compareProducts.some((p) => p.id === product.id)}
          onClick={() => handleAddProduct(product)}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <div className="compare-container">
      <h2>Compare Products</h2>

      {compareProducts.length === 0 ? (
        <p className="no-products">No products selected for comparison.</p>
      ) : (
        <div className="product-container">
          {compareProducts.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              bordered={true}
              className="product-card"
              extra={
                <Button
                  type="primary"
                  danger
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  Remove
                </Button>
              }
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </Card>
          ))}
        </div>
      )}

      <Button
        type="primary"
        onClick={openModal}
        disabled={compareProducts.length >= 4}
        style={{ marginTop: 20 }}
      >
        Add product
      </Button>

      <Modal
        title="Add More Products"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Table
          dataSource={allProducts}
          rowKey="id"
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
};

export default CompareProducts;
