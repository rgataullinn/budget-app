import { React, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";
import BasicPie from "../PieChart";

export default function ExpenseCategories({ month }) {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`https://budget-app-api-production.up.railway.app/categoriesList`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
      }
    };

    const fetchExpenses = async () => {
      const response = await fetch(`https://budget-app-api-production.up.railway.app/expensesByCategory?month=${month}`);
      const data = await response.json();
      if (response.ok) {
        setExpenses(data.expenses);
      }
    };

    if (month) {
      fetchCategories();
      fetchExpenses();
    }

  }, [month]);

  return (
    <div>
      <BasicPie month={month} />
      <Flex direction="column">
        {expenses.map((expensesData, index) => (
          <CategoryCard
            key={index}
            category={expensesData.category}
            total={expensesData.total}
            color={expensesData.color}
            expenses={expensesData.expenses}
            categories={categories}
          />
        ))}
      </Flex>
    </div>
  );
}
