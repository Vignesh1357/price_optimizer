import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { categories } from "../../Assets/Constants/Constants";
import { useNavigate } from "react-router-dom";

// Search bar styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  border: "rgb(7, 228, 206) 1px solid",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgb(7, 228, 206)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// Switch styling
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      backgroundColor: "white",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "rgb(7, 228, 206)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    color: "white",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
}));

// A main tool bar which contains search, filter and other functionalities
export default function ToolBar({
  title,
  filterData,
  handleFilter,
  handleFilterClick,
  handleSearch,
  isSelected,
  handleOpen,
  handleDemandForecast,
  isPriceOptimization,
  handleColumns,
  isDemandColumRequired,
}) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <Box sx={{ flexGrow: 1, background: "black" }}>
      <AppBar position="static" sx={{ background: "black" }}>
        <Toolbar>
          <Button onClick={handleBack}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ color: "rgb(7, 228, 206)" }}
            >
              <KeyboardDoubleArrowLeftOutlinedIcon />
            </IconButton>
            <p style={{ color: "white", marginRight: "5px" }}>Back</p>

            {/* </Typography> */}
          </Button>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ ml: 2, mr: 2, borderRightWidth: 1, background: "grey" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, ml: 2, display: { xs: "none", sm: "block" } }}
          >
            {title}
          </Typography>
          {!isPriceOptimization && (
            <>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <AntSwitch
                  checked={isDemandColumRequired}
                  inputProps={{
                    "aria-label": "ant design",
                  }}
                  onChange={handleColumns}
                />
                <Typography>With Demand Forecast</Typography>
              </Stack>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ ml: 2, mr: 2, borderRightWidth: 1, background: "grey" }}
              />
            </>
          )}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          <Box
            sx={{
              minWidth: 250,
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
            }}
          >
            <Typography
              noWrap
              component="div"
              sx={{ mr: 1, ml: 2, display: { xs: "none", sm: "block" } }}
            >
              Category :
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select
                labelId="category"
                id="category"
                value={filterData}
                onChange={handleFilter}
                sx={{
                  border: "rgb(7, 228, 206) 1px solid",
                  background: "rgba(7, 228, 206, 0.2)",
                  color: "white",
                  height: "40px",
                }}
              >
                {categories.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            sx={{
              background: "black",
              color: "white",
              ml: 2,
              mr: 2,
              border: "rgb(7, 228, 206) 1px solid",
            }}
            onClick={handleFilterClick}
          >
            Filter
          </Button>
          {!isPriceOptimization && (
            <>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ ml: 2, mr: 2, borderRightWidth: 1, background: "grey" }}
              />
              <Button
                sx={{ background: "rgb(7, 228, 206)", color: "black", ml: 2 }}
                onClick={handleOpen}
              >
                Add New Product
              </Button>
              <Button
                onClick={handleDemandForecast}
                disabled={!isSelected}
                sx={{ background: "rgb(7, 228, 206)", color: "black", ml: 2 }}
              >
                Demand Forecast
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
