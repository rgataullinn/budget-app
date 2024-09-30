// ExpenseCategories.js
import {React, useEffect, useState} from 'react';
import { Flex } from '@chakra-ui/react';
import DateCard from './DateCard';
import axios from 'axios';

export default function ExpenseDays() {
  const [categories, getCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://budget-app-api-production.up.railway.app/categories")
      .then((response) => {
        const categories = response.data.categories;
        if (Array.isArray(categories)) {
          getCategories(categories);
        } else {
          console.error("Unexpected data format:", categories);
          getCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        getCategories([]);
      });
  }, []);

  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get('https://budget-app-api-production.up.railway.app/expensesByDate?month=9')
      .then(response => {
        const data = response.data.expenses;
        if (Array.isArray(data)) {
          setDays(data);
        } else {
          console.error('Unexpected data format:', data);
          setDays([]);
        }
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
        setDays([]);
      });
  }, []);

  return (
    <Flex direction="column" spacing={5}>
      {days.map((dateData, index) => (
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