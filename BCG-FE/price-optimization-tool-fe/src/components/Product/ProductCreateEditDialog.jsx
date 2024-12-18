import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { categories } from "../../Assets/Constants/Constants";

// Dialog to create and edit product
const ProductCreateEditDialog = ({
  productData,
  isModalOpen,
  handleClose,
  handleProduct,
  errors,
  handleChange,
  dialogType,
}) => {
  return (
    <Dialog open={isModalOpen} onClose={handleClose} fullWidth={true}>
      <DialogTitle>
        {dialogType === "add" ? "Add New Product" : "Edit Product"}
      </DialogTitle>
      <Divider variant="middle" />

      <DialogContent>
        <Box
          component="form"
          onSubmit={(e) => handleProduct(e, dialogType)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 1000,
            margin: "auto",
          }}
        >
          {/* Product Name */}
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => {
              handleChange(e, "name");
            }}
            value={productData.name}
            error={!!errors.productName}
            helperText={errors.productName}
          />

          {/* Product Category */}
          <FormControl fullWidth required error={!!errors.productCategory}>
            <InputLabel>Product Category</InputLabel>
            <Select
              value={productData.category}
              onChange={(e) => {
                handleChange(e, "category");
              }}
            >
              {categories.map((item) => {
                if (item.value !== "all")
                  return <MenuItem value={item.value}>{item.name}</MenuItem>;
              })}
            </Select>
            {errors.productCategory && (
              <Typography color="error" variant="caption">
                {errors.productCategory}
              </Typography>
            )}
          </FormControl>

          {/* Cost Price and Selling Price */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "1fr 1fr",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Cost Price"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={productData.cost_price}
              onChange={(e) => {
                handleChange(e, "cost_price");
              }}
              error={!!errors.costPrice}
              helperText={errors.costPrice}
            />
            <TextField
              label="Selling Price"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={productData.selling_price}
              onChange={(e) => {
                handleChange(e, "selling_price");
              }}
              error={!!errors.sellingPrice}
              helperText={errors.sellingPrice}
            />
          </Box>

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            multiline
            minRows={3}
            fullWidth
            required
            value={productData.description}
            onChange={(e) => {
              handleChange(e, "description");
            }}
            error={!!errors.description}
            helperText={errors.description}
          />

          {/* Available Stock and Units Sold */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Available Stock"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={productData.stock_available}
              onChange={(e) => {
                handleChange(e, "stock_available");
              }}
              error={!!errors.availableStock}
              helperText={errors.availableStock}
            />
            <TextField
              label="Units Sold"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={productData.units_sold}
              onChange={(e) => {
                handleChange(e, "units_sold");
              }}
              error={!!errors.unitsSold}
              helperText={errors.unitsSold}
            />
          </Box>
          <Divider variant="middle" />

          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                border: "1px solid rgb(7, 228, 206)",
                background: "black",
                color: "white",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{ background: "rgb(7, 228, 206)", color: "white" }}
              onClick={(e) => handleProduct(e, dialogType)}
            >
              {dialogType === "add" ? "Add" : "Edit"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreateEditDialog;
