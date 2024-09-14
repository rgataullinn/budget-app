// CategoryCard.js
import React, { useState } from "react";
import { Box, Text, Flex, Collapse, useDisclosure } from "@chakra-ui/react";
import ExpenseModal from "./ExpenseModal";
import "../styles/styles.css";

function formatDate(dateStr) {
  dateStr = dateStr.replace("-", "/");
  const date = new Date(dateStr);

  const options = { month: "short", day: "numeric" };

  return date.toLocaleDateString("en-US", options);
}


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
    // Update the selected expense state here if needed
    // This function will be called when the user clicks "Save" in the modal
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
        <Text fontWeight="bold" fontSize="lg">
          {category}
        </Text>
        <Text fontWeight="bold" fontSize="lg">${Math.round(total)}</Text>
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
