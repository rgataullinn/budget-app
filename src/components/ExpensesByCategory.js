// ExpenseCategories.js
import { React, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";
import BasicPie from "./PieChart";
import axios from "axios";

export default function ExpenseCategories() {

  const [categories_name, getCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://budget-app-api-production.up.railway.app/categories")
      .then((response) => {
        const categories_name = response.data.categories;
        if (Array.isArray(categories_name)) {
          getCategories(categories_name);
        } else {
          console.error("Unexpected data format:", categories_name);
          getCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        getCategories([]);
      });
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://budget-app-api-production.up.railway.app/expensesByCategory?month=9"
      )
      .then((response) => {
        const data = response.data.expenses;
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

  return (
    <div>
      <BasicPie />
      <Flex direction="column" spacing={5}>
        {categories.map((categoryData, index) => (
          <CategoryCard
            key={index}
            category={categoryData.category}
            total={categoryData.total}
            expenses={categoryData.expenses}
            categories={categories_name}
          />
        ))}
      </Flex>
    </div>
  );
}
