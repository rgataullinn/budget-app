import { React, useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

export default function BasicPie() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://budget-app-api-production.up.railway.app/categoriesAndTotals"
      )
      .then((response) => {
        const data = response.data.categories;
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Unexpected data format:", data);
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        setCategories([]);
      });
  }, []);

  const pieChartData = categories.map((category, index) => ({
    id: index,
    value: category.total,
    label: category.name,
    color: category.color
  }));

  return (
    <div border="black solid 1px">
      <PieChart
        series={[
          {
            data: pieChartData,
            innerRadius: 60,
            outerRadius: 110,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: 1,
            endAngle: 360,
            cx: "50%",
            cy: 130,
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        height={300}
      />
    </div>
  );
}
