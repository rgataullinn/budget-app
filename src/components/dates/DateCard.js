import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Collapse,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import ExpenseModal from "../ExpenseModal";

function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00Z");

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options = { month: "short", day: "numeric", timeZone: "UTC" };
  return date.toLocaleDateString("en-US", options);
}

function cntTotal(expenses) {
  let res = 0;
  for (let i = 0; i < expenses.length; i++) res += expenses[i].amount;
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

const DateCard = ({ date, expenses, categories }) => {
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
        <Text fontWeight="bold" fontSize="lg">
          {formatDate(date)}
        </Text>
        <Text fontWeight="bold" fontSize="lg">
          ${Math.round(cntTotal(expenses))}
        </Text>
      </Flex>

      {/* Expenses Container */}
      <Collapse in={!isOpen}>
        <Flex direction="column" gap={3}>
          {expenses.map((expense, index) => (
            <Flex
              key={index}
              justify="space-between"
              alignItems="center"
              mt={5}
              py={2}
              cursor="pointer"
              bg="#ffffff"
              onClick={() => handleExpenseClick(expense)}
            >
              <CircleIcon
                boxSize={4}
                mr={2}
                color={expense.color}
              />
              <Box flex="3" textAlign="left">
                <Text fontSize='lg'>{expense.name}</Text>
                <Text fontSize='sm' color='gray'>{expense.category_name} {expense.expense_time}</Text>
              </Box>
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
        categories={categories}
      />
    </Box>
  );
};

export default DateCard;
