import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import React from "react";
import electronicsImg from "../../Assets/Images/electronics.jpg";
import "./Product.scss";

// Dialog to view product details
const ProductDetailsDialog = ({
  product,
  handleDetailsDialog,
  isDetailsDialogOpen,
}) => {
  return (
    <div className="details-dialog">
      <Dialog
        onClose={handleDetailsDialog}
        open={isDetailsDialogOpen}
        fullWidth
      >
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent sx={{ display: "grid", justifyContent: "center" }}>
          <div className="flex justify-center product-details-img-container ">
            <img src={electronicsImg} className="product-details-img" />
          </div>
          <div className="product-name">
            <span className="font-600">Product Name:</span>
            <h2 className="no-margin">{product.name}</h2>{" "}
          </div>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <>
            <span className="font-600">Description:</span>
            <p className="no-margin decription">{product.description}</p>{" "}
          </>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <div className="details-container">
            <div>
              <span className="font-600">Category:</span>
              <h2 className="no-margin ">{product.category}</h2>{" "}
            </div>
            <div>
              <span className="font-600">Units available:</span>
              <h2 className="no-margin">{product.stock_available}</h2>{" "}
            </div>
            <div>
              <span className="font-600">Customer Rating:</span>
              <h2 className="no-margin">
                {product.cutomer_rating ? product.cutomer_rating : "-"}
              </h2>{" "}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailsDialog;
