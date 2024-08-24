import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Typography, Box } from '@mui/material';

interface ProductFormProps {
  onAddProduct?: (product: Product) => void;
  onUpdateProduct?: (product: Product) => void;
  existingProduct?: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onAddProduct,
  onUpdateProduct,
  existingProduct,
}) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setPrice(existingProduct.price.toString());
      setImage(existingProduct.image);
    }
  }, [existingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price && image) {
      const product: Product = {
        id: existingProduct ? existingProduct.id : uuidv4(),
        name,
        price: parseFloat(price),
        image,
      };

      if (existingProduct && onUpdateProduct) {
        // Placeholder for update API call
        onUpdateProduct(product);
      } else if (onAddProduct) {
        // Placeholder for create API call
        onAddProduct(product);
      }

      navigate('/');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      <Typography variant="h5" gutterBottom>
        {existingProduct ? 'Edit Product' : 'Create Product'}
      </Typography>
      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {existingProduct ? 'Update Product' : 'Add Product'}
      </Button>
    </Box>
  );
};

export default ProductForm;
