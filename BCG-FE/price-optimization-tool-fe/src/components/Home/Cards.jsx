import React from "react";
import "./Home.scss";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import productIcon from "../../Assets/Images/product-management.png";

// Card component, used to render in home page
const Cards = ({ details }) => {
  return (
    <Card sx={{ minWidth: 250, maxWidth: 330, height: 450 }}>
      <div className="card-img-container">
        <img className="card-img" src={productIcon} />
      </div>
      <CardContent>
        <Typography
          gutterBottom
          sx={{ color: "text.primary", fontSize: 24, fontWeight: 600 }}
        >
          {details.title}
        </Typography>

        <Typography variant="body2" sx={{ textAlign: "left" }}>
          Lorem ipsum dolor sit amet, consectetur labore adipiscing elit, sed do
          eiusmod tempor labore incididunt,ut labore et dolore magna aliqua.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: "#333",
          }}
          onClick={() => details.onClickHandler(details.id)}
        >
          <ArrowForwardIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
