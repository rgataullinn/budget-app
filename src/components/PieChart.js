import { React, useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ month }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`https://budget-app-api-production.up.railway.app/categories?month=${month}`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
      } else {
        console.error("Error fetching categories:", data); // Log error if response is not ok
        setCategories([]);
      }
    };

    if (month) {
      fetchCategories();
    }
  }, [month]);

  const pieChartData = categories.map((category, index) => ({
    id: index,
    value: category.total,
    label: category.name,
    color: category.color,
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
            cx: 190,
            cy: 130,
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        height={300}
      />
    </div>
  );
}
