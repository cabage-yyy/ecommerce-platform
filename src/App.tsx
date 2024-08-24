
// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import { Product } from './types/Product';
import ProductList from './compomemts/ProductList';
import ProductForm from './compomemts/ProductForm';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Product 3',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
  },
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Router>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Routes>
            <Route
              path="/"
              element={<ProductList products={products} setSelectedProduct={setSelectedProduct} />}
            />
            <Route
              path="/create"
              element={<ProductForm onAddProduct={addProduct} />}
            />
            <Route
              path="/edit"
              element={<ProductForm existingProduct={selectedProduct} onUpdateProduct={updateProduct} />}
            />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
