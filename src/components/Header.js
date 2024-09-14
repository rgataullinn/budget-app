import React from "react";
import { Box } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const data = {
    labels: ["Food", "Transport", "Entertainment", "Shopping", "Other"],
    datasets: [
      {
        label: "Expenses by Category",
        data: [300, 150, 100, 200, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box width="400px" margin="auto">
      <Pie data={data} />
    </Box>
  );
}

export default PieChart;
