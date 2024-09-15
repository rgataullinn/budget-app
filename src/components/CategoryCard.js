// CategoryCard.js
import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Collapse,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import ExpenseModal from "./ExpenseModal";
import "../styles/styles.css";

function formatDate(dateStr) {
  dateStr = dateStr.replace("-", "/");
  const date = new Date(dateStr);

  const options = { month: "short", day: "numeric" };

  return date.toLocaleDateString("en-US", options);
}

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

const colors = new Map([
  ["Bills", "#F1642E"],
  ["Food & Drink", "#A3B565"],
  ["Treats", "#FCDD9D"],
  ["Groceries", "#90D5FF"],
  ["Personal Care", "pink"],
  ["Shopping", "blue"]
])

const CategoryCard = ({ category, expenses, total }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const handleExpenseClick = (expense) => {
    setSelectedExpense(expense);
    openModal();
  };

  const handleUpdateExpense = (updatedExpense) => {
    console.log("Updated Expense:", updatedExpense);
  };

  return (
    <Box className="category" padding="5" borderRadius="md" mb={5}>
      {/* Clickable Header Row */}
      <Flex
        align="center"
        justify="space-between"
        mb={0}
        cursor="pointer"
        onClick={onToggle}
      >
        <Flex direction="row" alignItems="center">
          <CircleIcon boxSize={6} color={colors.get(category)} mr={2}/>
          <Text fontWeight="bold" fontSize="lg">
            {category}
          </Text>
        </Flex>

        <Text fontWeight="bold" fontSize="lg">
          ${Math.round(total)}
        </Text>
      </Flex>

      {/* Expenses Container */}
      <Collapse in={isOpen}>
        <Flex direction="column">
          {expenses.map((expense, index) => (
            <Flex
              key={index}
              justify="space-between"
              alignItems="center"
              borderBottom="1px solid"
              borderColor="gray.200"
              py={2}
              mt={5}
              cursor="pointer"
              onClick={() => handleExpenseClick(expense)}
            >
              <Text flex="1" textAlign="left">
                {expense.name}
              </Text>
              <Text flex="1" textAlign="center">
                {formatDate(expense.expense_date)}
              </Text>
              <Text flex="1" textAlign="right">
                ${expense.amount}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Collapse>

      {/* Modal for Expense Details */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        expense={selectedExpense}
        onUpdate={handleUpdateExpense}
      />
    </Box>
  );
};

export default CategoryCard;
