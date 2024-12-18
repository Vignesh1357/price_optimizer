import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiCall } from "../../Utils/ApiService/ApiService";
import { useDebounceHook } from "../../Utils/CustomHooks/useDebounceHook";
import ProductsTable from "./ProductsTable";
import "./Product.scss";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DemandChart from "./DemandChart";
import Appbar from "../Appbar/Appbar";
import ProductDetailsDialog from "./ProductDetailsDialog";
import ProductCreateEditDialog from "./ProductCreateEditDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import ToolBar from "./ToolBar";

// Main component of the product
const Product = () => {
  const location = useLocation();

  // component states
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [filterData, setFilterData] = useState("all");
  const [searchData, setSearchData] = useState("");
  const [selected, setSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState({});
  const [errors, setErrors] = useState({});
  const [isForecastModelOpen, setIsForecastModelOpen] = useState(false);
  const [foreCastProducts, setForeCastProducts] = useState([]);
  const [isDemandColumRequired, setIsDemandColumRequired] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("add");
  const [deleteModal, setDeleteModal] = useState(false);

  const debouncedValue = useDebounceHook(searchData, 1000); // Custom hook for search functionality

  // Load the product
  useEffect(() => {
    getProducts();
  }, [debouncedValue]);

  // Set the page heading
  useEffect(() => {
    if (location.pathname.includes("create")) {
      setTitle("Create and Manage Product");
    } else {
      setTitle("Price Optimization");
    }
  }, []);

  // API call to fetch products
  const getProducts = async () => {
    let queryParam = { page_size: 100 };
    if (searchData) {
      queryParam["search"] = searchData;
    }
    if (filterData && filterData !== "all") {
      queryParam["category"] = filterData;
    }
    let response = await apiCall("get", "/", {}, "product", queryParam);
    if (response.status === 200) {
      setProducts(response.data.results);
    } else {
      window.alert("Failed to load product details!");
    }
  };

  // Filter and search handlers
  const handleFilter = (e) => {
    setFilterData(e.target.value);
  };
  const handleFilterClick = () => {
    getProducts();
  };
  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  // Select handlers
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // Dialog state handlers
  const handleClickOpen = () => {
    setProductData({});
    setDialogType("add");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Handler to update values
  const handleChange = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case "name":
        setProductData({ ...productData, name: value });
        break;
      case "category":
        setProductData({ ...productData, category: value });
        break;
      case "cost_price":
        setProductData({ ...productData, cost_price: value });
        break;
      case "selling_price":
        setProductData({ ...productData, selling_price: value });
        break;
      case "description":
        setProductData({ ...productData, description: value });
        break;
      case "units_sold":
        setProductData({ ...productData, units_sold: value });
        break;
      case "stock_available":
        setProductData({ ...productData, stock_available: value });
    }
  };

  // Function to check for errora and call Create/Update API
  const handleProduct = async (e, type) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!productData.name) newErrors.productName = "Product Name is required.";
    if (!productData.category)
      newErrors.productCategory = "Product Category is required.";
    if (!productData.cost_price)
      newErrors.costPrice = "Cost Price is required.";
    if (!productData.selling_price)
      newErrors.sellingPrice = "Selling Price is required.";
    if (!productData.description)
      newErrors.description = "Description is required.";
    if (!productData.stock_available)
      newErrors.availableStock = "Available Stock is required.";
    if (!productData.units_sold)
      newErrors.unitsSold = "Units Sold is required.";

    setErrors(newErrors);

    // Check if there are no errors
    if (Object.keys(newErrors).length === 0) {
      let method, endpoint;

      if (type === "add") {
        method = "post";
        endpoint = "/create/";
      } else {
        method = "put";
        endpoint = `/${productData.id}/`;
      }
      const response = await apiCall(method, endpoint, productData, "product");
      console.log(response);
      if (response.status === 201) {
        handleClose();
        window.alert("Prodct Created Successfully!");
        getProducts();
      } else if (response.status === 200) {
        handleClose();
        window.alert("Prodct Updated Successfully!");
        getProducts();
      } else {
        window.alert(response);
      }
    }
  };

  // Switch handler
  const handleDemandForecast = async () => {
    const response = await apiCall(
      "post",
      "/forecast/",
      { product_ids: selected },
      "product"
    );

    if (response.status === 200) {
      setForeCastProducts(response.data.products);
      window.alert("Demand forecast date has been generated!");
      setIsForecastModelOpen(true);
      setSelected([]);
    }
  };

  const handleColumns = () => {
    setIsDemandColumRequired(!isDemandColumRequired);
  };

  // View product dialog handler
  const handleViewProduct = async (row) => {
    handleDetailsDialog();
    setProduct(row);
  };

  const handleDetailsDialog = () => {
    setIsDetailsDialogOpen(!isDetailsDialogOpen);
  };

  // Edit product dialog handler
  const handleEditProduct = (row) => {
    setProductData(row);
    setIsModalOpen(!isModalOpen);
    setDialogType("edit");
  };

  const handleDeleteModal = (row) => {
    setProduct(row);
    setDeleteModal(!deleteModal);
  };

  // Delete product dialog handler
  const handleDelete = async () => {
    const response = await apiCall("delete", `/${product.id}/`, {}, "product");
    if (response.status === 204) {
      setDeleteModal(false);
      window.alert("Successfully deleted the product!");
      getProducts();
    } else {
      window.alert(response);
    }
  };
  return (
    <div>
      <Appbar /> {/* Main App bar */}
      {/* Tool bar */}
      <ToolBar
        title={title}
        filterData={filterData}
        handleFilter={handleFilter}
        handleFilterClick={handleFilterClick}
        handleSearch={handleSearch}
        isSelected={selected.length > 0}
        handleOpen={handleClickOpen}
        handleDemandForecast={handleDemandForecast}
        isPriceOptimization={title.includes("Price")}
        handleColumns={handleColumns}
        isDemandColumRequired={isDemandColumRequired}
      />
      {/* Products Table */}
      <div className="table">
        <ProductsTable
          products={products}
          selected={selected}
          handleClick={handleClick}
          handleSelectAllClick={handleSelectAllClick}
          isPriceOptimization={title.includes("Price")}
          isDemandColumRequired={isDemandColumRequired}
          handleViewProduct={handleViewProduct}
          handleEditProduct={handleEditProduct}
          handleDeleteModal={handleDeleteModal}
        />
      </div>
      {/* Dialog to create and edit product */}
      <ProductCreateEditDialog
        productData={productData}
        handleProduct={handleProduct}
        handleClose={handleClose}
        isModalOpen={isModalOpen}
        errors={errors}
        handleChange={handleChange}
        dialogType={dialogType}
      />
      {/* Delete action confirmation dialog */}
      <DeleteConfirmationDialog
        deleteModal={deleteModal}
        handleDeleteModal={handleDeleteModal}
        handleDelete={handleDelete}
      />
      {/* Dialog to render demand forecast chart */}
      <Dialog
        onClose={() => {
          setIsForecastModelOpen(false);
        }}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#333",
            color: "white",
          },
        }}
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth="lg"
        open={isForecastModelOpen}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, background: "black" }}
          id="customized-dialog-title"
        >
          Demand Forecast
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            getProducts();
            setIsForecastModelOpen(false);
          }}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div style={{ background: "black", color: "#333", margin: "1em" }}>
            <DemandChart data={foreCastProducts} />
          </div>
          <ProductsTable products={foreCastProducts} type="forecast" />
        </DialogContent>
      </Dialog>
      {/* Dialog to view product deltaila */}
      <ProductDetailsDialog
        product={product}
        handleDetailsDialog={handleDetailsDialog}
        isDetailsDialogOpen={isDetailsDialogOpen}
      />
    </div>
  );
};

export default Product;
