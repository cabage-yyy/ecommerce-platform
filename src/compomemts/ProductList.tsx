import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { Button, Card, CardContent, Typography, CardMedia, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';

interface ProductListProps {
  products: Product[];
  setSelectedProduct: (product: Product | null) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, setSelectedProduct }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);

  const handleCreateClick = () => {
    navigate('/create');
  };

  const handleEditClick = () => {
    if (selectedProduct) {
      navigate('/edit');
    }
  };

  const handleDeleteClick = () => {
    if (selectedProduct) {
      setConfirmDelete(selectedProduct);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProductState(product);
    setSelectedProduct(product);
  };

  const confirmDeleteProduct = async () => {
    if (confirmDelete) {
      // Placeholder for delete API call
      // await axios.delete(`https://your-api-gateway-url/products/${confirmDelete.id}`);
      setConfirmDelete(null);
      navigate('/');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateClick} style={{ marginBottom: '20px' }}>
        Create Product
      </Button>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              onClick={() => handleProductSelect(product)}
              style={{
                border: selectedProduct?.id === product.id ? '2px solid blue' : 'none',
                cursor: 'pointer',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">Price: ${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleEditClick}
          disabled={!selectedProduct}
          style={{ marginRight: '10px' }}
        >
          Edit Product
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteClick}
          disabled={!selectedProduct}
        >
          Delete Product
        </Button>
      </Box>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {confirmDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteProduct} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
