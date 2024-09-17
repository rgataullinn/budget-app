// ExpenseCategories.js
import {React, useEffect, useState} from 'react';
import { Flex } from '@chakra-ui/react';
import CategoryCard from './CategoryCard';
import axios from 'axios';

export default function ExpenseCategories() {
  // Example data
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('https://budget-app-api-production.up.railway.app/expensesByCategory?month=9')
      .then(response => {
        const data = response.data.expenses;
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Unexpected data format:', data);
          setCategories([]);
        }
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
        setCategories([]);
      });
  }, []);

  return (
    <Flex direction="column" spacing={5}>
      {categories.map((categoryData, index) => (
        <CategoryCard
          key={index}
          category={categoryData.category}
          total={categoryData.total}
          expenses={categoryData.expenses}
        />
      ))}
    </Flex>
  );
}