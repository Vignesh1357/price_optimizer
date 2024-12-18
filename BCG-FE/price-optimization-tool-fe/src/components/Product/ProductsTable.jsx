import * as React from "react";
import "./Product.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Some table styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },

  "& .MuiCheckbox-root": {
    color: "rgb(7, 228, 206)",
  },
  "& .MuiCheckbox-root:not(.Mui-checked)": {
    color: "grey",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductsTable({
  products,
  selected,
  handleClick,
  handleSelectAllClick,
  isPriceOptimization,
  isDemandColumRequired,
  type = "productData",
  handleViewProduct,
  handleEditProduct,
  handleDeleteModal,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* Table column header */}
            {type !== "forecast" && !isPriceOptimization && (
              <StyledTableCell
                padding="checkbox"
                className="custom-grey-border"
              >
                <Checkbox
                  color="primary"
                  className="custom-grey-border"
                  onChange={handleSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </StyledTableCell>
            )}
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="left">Product Category</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="center">Cost Price</StyledTableCell>
            <StyledTableCell align="center">Selling Price</StyledTableCell>

            {!isPriceOptimization && (
              <>
                <StyledTableCell align="center">
                  Available Stock
                </StyledTableCell>
                <StyledTableCell align="center">Units Sold</StyledTableCell>
              </>
            )}

            {type === "forecast" ? (
              <StyledTableCell align="center" sx={{ width: "15%" }}>
                Calculated Demand Forecast
              </StyledTableCell>
            ) : !isPriceOptimization ? (
              isDemandColumRequired ? (
                <>
                  <StyledTableCell align="center" sx={{ width: "5%" }}>
                    Demand Forecast
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "15%" }}>
                    Action
                  </StyledTableCell>
                </>
              ) : (
                <StyledTableCell align="center" sx={{ width: "15%" }}>
                  Action
                </StyledTableCell>
              )
            ) : (
              <StyledTableCell align="center">Optimized Price</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => {
            const isItemSelected =
              type !== "forecast" && selected.includes(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <StyledTableRow key={row.name}>
                {type !== "forecast" && !isPriceOptimization && (
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={(e) => handleClick(e, row.id)}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </StyledTableCell>
                )}
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.category_display}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    maxWidth: "300px",
                  }}
                >
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  $ {row.cost_price}
                </StyledTableCell>
                <StyledTableCell align="center">
                  $ {row.selling_price}
                </StyledTableCell>

                {!isPriceOptimization && (
                  <>
                    <StyledTableCell align="center">
                      {row.stock_available}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.units_sold}
                    </StyledTableCell>
                  </>
                )}
                {type === "forecast" ? (
                  <StyledTableCell
                    align="center"
                    sx={{ color: "rgb(7, 228, 206)", fontWeight: "600" }}
                  >
                    {row.forecast_data ? Math.round(row.forecast_data) : "-"}
                  </StyledTableCell>
                ) : !isPriceOptimization ? (
                  isDemandColumRequired ? (
                    <>
                      {" "}
                      <StyledTableCell
                        align="center"
                        sx={{ color: "rgb(7, 228, 206)", fontWeight: "600" }}
                      >
                        {row.forecast_data
                          ? Math.round(row.forecast_data)
                          : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="View details">
                          <VisibilityIcon
                            sx={{ mr: 2 }}
                            className="pointer"
                            onClick={() => {
                              handleViewProduct(row);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Edit">
                          <EditIcon
                            className="pointer"
                            sx={{ mr: 2 }}
                            onClick={() => {
                              handleEditProduct(row);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteOutlineOutlinedIcon
                            sx={{ color: "red" }}
                            className="pointer"
                            onClick={() => handleDeleteModal(row)}
                          />
                        </Tooltip>
                      </StyledTableCell>
                    </>
                  ) : (
                    <StyledTableCell align="center">
                      <Tooltip title="View details">
                        <VisibilityIcon
                          sx={{ mr: 2 }}
                          className="pointer"
                          onClick={() => {
                            handleViewProduct(row);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <EditIcon
                          sx={{ mr: 2 }}
                          className="pointer"
                          onClick={() => {
                            handleEditProduct(row);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteOutlineOutlinedIcon
                          sx={{ color: "red" }}
                          className="pointer"
                          onClick={() => handleDeleteModal(row)}
                        />
                      </Tooltip>
                    </StyledTableCell>
                  )
                ) : (
                  <StyledTableCell
                    align="center"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "grey" }}>${row.cost_price}</span>
                    <span
                      style={{ color: "rgb(7, 228, 206)", fontWeight: "600" }}
                    >
                      {row.optimized_price ? "$" + row.optimized_price : "-"}
                    </span>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
