import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input, 
  InputGroup,
  InputLeftAddon,
  Textarea,
  Button,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function CreateExpenseOrCategory() {
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

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const [expenseData, setExpenseData] = useState({
    user_id: 1,
    category_id: "",
    amount: "",
    name: "",
    description: "",
    expense_date: "",
  });

  const [selectedTab, setSelectedTab] = useState(0); // To switch between expense and category forms
  const toast = useToast();

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleCreateExpense = async () => {
    try {
      // Ensure category_id and amount are integers
      const postData = {
        ...expenseData,
        category_id: parseInt(expenseData.category_id, 10),
        amount: parseFloat(expenseData.amount, 10), // Use parseFloat if you need decimal values; use parseInt if you need integers
      };

      await axios.post(
        "https://budget-app-api-production.up.railway.app/expense",
        postData
      );
      toast({ title: "Expense created!", status: "success", duration: 2000 });
      // Reset the form
      setExpenseData({
        category_id: "",
        amount: "",
        name: "",
        description: "",
        expense_date: "",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error creating expense",
        status: "error",
        duration: 2000,
      });
    }
  };

  const handleCreateCategory = async () => {
    try {
      await axios.post(
        "https://budget-app-api-production.up.railway.app/category",
        categoryData
      );
      toast({ title: "Category created!", status: "success", duration: 2000 });
      // Reset the form
      setCategoryData({ name: "", description: "" });
    } catch (error) {
      toast({
        title: "Error creating category",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Tabs index={selectedTab} onChange={setSelectedTab} isFitted>
      <TabList mb="1em">
        <Tab>Create Expense</Tab>
        <Tab>Create Category</Tab>
      </TabList>

      <TabPanels>
        {/* Expense Creation Form */}
        <TabPanel>
          <Box>
            <FormControl mb="4">
              <FormLabel>Category</FormLabel>
              <Select
                name="category_id"
                value={expenseData.category_id}
                onChange={handleExpenseChange}
                placeholder="Select category"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  name="amount"
                  type="number"
                  value={expenseData.amount}
                  onChange={handleExpenseChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={expenseData.name}
                onChange={handleExpenseChange}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={expenseData.description}
                onChange={handleExpenseChange}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Expense Date</FormLabel>
              <Input
                name="expense_date"
                type="date"
                value={expenseData.expense_date}
                onChange={handleExpenseChange}
              />
            </FormControl>

            <Button colorScheme="green" onClick={handleCreateExpense}>
              Create Expense
            </Button>
          </Box>
        </TabPanel>

        {/* Category Creation Form */}
        <TabPanel>
          <Box>
            <FormControl mb="4">
              <FormLabel>Category Name</FormLabel>
              <Input
                name="name"
                value={categoryData.name}
                onChange={handleCategoryChange}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Category Description</FormLabel>
              <Textarea
                name="description"
                value={categoryData.description}
                onChange={handleCategoryChange}
              />
            </FormControl>

            <Button colorScheme="green" onClick={handleCreateCategory}>
              Create Category
            </Button>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default CreateExpenseOrCategory;
