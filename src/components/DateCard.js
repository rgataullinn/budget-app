// CategoryCard.js
import React, { useState } from "react";
import { Box, Text, Flex, Collapse, useDisclosure, Icon } from "@chakra-ui/react";
import ExpenseModal from "./ExpenseModal";

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00Z');

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options = { month: "short", day: "numeric", timeZone: 'UTC' };
  return date.toLocaleDateString("en-US", options);
}

function cntTotal(expenses) {
  var res = 0;
  for (var i = 0; i < expenses.length; i++) res += expenses[i].amount;
  return res;
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

const DateCard = ({ date, expenses }) => {
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
    <Box className="category" padding="5" borderRadius="md" mb={5}
    >
      {/* Clickable Header Row */}
      <Flex
        align="center"
        justify="space-between"
        mb={0}
        cursor="pointer"
        onClick={onToggle}
      >
        <Text fontWeight="bold" fontSize="lg">
          {formatDate(date)}
        </Text>
        <Text fontWeight="bold" fontSize="lg">${Math.round(cntTotal(expenses))}</Text>
      </Flex>

      {/* Expenses Container */}
      <Collapse in={!isOpen}>
        <Flex direction="column" spacing={3}>
          {expenses.map((expense, index) => (
            <Flex
              key={index}
              justify="space-between"
              alignItems="center"
              mt={5}
              py={2}
              cursor="pointer"
              onClick={() => handleExpenseClick(expense)}
            >
              <CircleIcon boxSize={4} mr={1} color={colors.get(expense.category_name)}/>
              <Text flex="1" textAlign="left">
                {expense.name}
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

export default DateCard;
