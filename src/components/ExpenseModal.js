import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  Flex,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const ExpenseModal = ({ isOpen, onClose, expense, onUpdate, categories }) => {
  const [editableExpense, setEditableExpense] = useState(expense || {});
  const toast = useToast();

  useEffect(() => {
    setEditableExpense(expense || {});
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableExpense((prev) => ({
      ...prev,
      [name]: (name === "amount" || name === "category_id") && value !== "" ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://budget-app-api-production.up.railway.app/expense?id=${editableExpense.id}`,
        editableExpense
      );

      onUpdate(response.data);
      toast({
        title: "Expense updated.",
        description: "Your expense has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error updating expense:", error);
      toast({
        title: "Update failed.",
        description: "There was an error updating your expense. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://budget-app-api-production.up.railway.app/expense?id=${editableExpense.id}`
      );

      onUpdate(response.data);
      toast({
        title: "Expense deleted.",
        description: "Your expense has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast({
        title: "Delete failed.",
        description: "There was an error deleting your expense. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={4}>
            <Input
              placeholder="Name"
              name="name"
              value={editableExpense.name || ""}
              onChange={handleChange}
            />
            <Input
              placeholder="Description"
              name="description"
              value={editableExpense.description || ""}
              onChange={handleChange}
            />
            <Select
              name="category_id"
              value={editableExpense.category_id || ""}
              onChange={handleChange}
              placeholder="Select category"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Amount"
              type="number"
              name="amount"
              value={editableExpense.amount || ""}
              onChange={handleChange}
            />
            <Input
              placeholder="Date"
              name="expense_date"
              value={editableExpense.expense_date || ""}
              onChange={handleChange}
            />
            <Flex direction="row" justifyContent="space-between">
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
              <Button colorScheme="blue" onClick={handleSave}>
                Save
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExpenseModal;
