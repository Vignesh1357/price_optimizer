import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // Register all necessary components

const DemandChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Store the chart instance

  useEffect(() => {
    const chartContext = chartRef.current.getContext("2d");

    // Clean up the previous chart instance if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Extract data for X and Y axes
    const productNames = data.map((item) => item.name);
    const sellingPrices = data.map((item) => parseFloat(item.selling_price));
    const forecastedSales = data.map((item) => item.forecast_data);

    // Create the chart
    chartInstance.current = new Chart(chartContext, {
      type: "line",
      data: {
        labels: productNames, // X-axis: Products
        datasets: [
          {
            label: "Selling Price",
            data: sellingPrices, // Y-axis: Selling Prices
            borderColor: "rgb(103, 4, 224)",
            backgroundColor: "rgba(103, 4, 224, 0.5)",
            tension: 0.4, // Smooth line
          },
          {
            label: "Demand",
            data: forecastedSales, // Y-axis: Demand
            borderColor: "rgb(30, 247, 135)",
            backgroundColor: "rgba(30, 247, 135, 0.5)",
            tension: 0.4, // Smooth line
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            type: "category", // X-axis scale type
            title: {
              display: true,
              text: "Products",
            },
          },
          y: {
            title: {
              display: true,
              text: "Values",
            },
            beginAtZero: true,
            grid: {
              color: "#333",
            },
          },
        },
        layout: {
          padding: {
            top: 60, // Padding at the top (adjust to center vertically)
          },
        },
      },
    });

    // Cleanup function to destroy chart instance when the component unmounts or updates
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div style={{ width: "800px", height: "400px", margin: "0 auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DemandChart;
