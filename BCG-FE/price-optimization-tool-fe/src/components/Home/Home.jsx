import React from "react";
import "./Home.scss";
import bcgLogo from "../../Assets/Images/bcg-x.png";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";

// Home component, consists of two cards
const Home = () => {
  const navigate = useNavigate();
  // details required to render the cards
  let cardDetails = [
    {
      title: "Create and Manage Product",
      onClickHandler: handleClick,
      id: "create",
    },
    {
      title: "Pricing Optimization",
      onClickHandler: handleClick,
      id: "optimize",
    },
  ];

  // Redirection handler function
  function handleClick(id) {
    switch (id) {
      case "create":
        navigate("/product/create-and-manage");
        break;
      case "optimize":
        navigate("/product/price-optimization");
        break;
    }
  }
  return (
    <div className="main-container">
      <div className="home-container">
        <div className="img-container flex justify-center">
          <img className="img" src={bcgLogo} />
        </div>
        <div className="heading-container">
          <span className="heading font-white  justify-center">
            Price Optimization Tool
          </span>
          <span className="font-white help-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt, consectetur adipiscing elit,ut labore et
            dolore magna aliqua.
          </span>
        </div>
        <div className="card-container">
          {cardDetails.map((details) => (
            <Cards key={details.id} details={details} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
