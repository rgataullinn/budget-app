import { React, useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import DateCard from './DateCard';

export default function ExpenseDays({ month }) {
  const [categories, setCategories] = useState([]);
  const [expensesByDays, setExpenses] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://budget-app-api-production.up.railway.app/categoriesList');
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
      }
    };

    const fetchExpenses = async () => {
      const response = await fetch(`https://budget-app-api-production.up.railway.app/expensesByDate?month=${month}`);
      const data = await response.json();
      if (response.ok) {
        setExpenses(data.expenses);
      }
    };

    fetchCategories();
    fetchExpenses();
  }, [month]); 

  return (
    <Flex direction="column" gap={5}>
      {expensesByDays.map((dateData, index) => (
        <DateCard
          key={index}
          date={dateData.day}
          expenses={dateData.expenses}
          categories={categories}
        />
      ))}
    </Flex>
  );
}
