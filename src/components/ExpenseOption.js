import React from "react";
import { Tabs, Tab, TabPanels, TabPanel, TabList, Text } from "@chakra-ui/react";
import ExpensesByCategory from "./ExpensesByCategory";
import ExpensesByDate from "./ExpenseByDate";
import CreateExpenseOrCategory from "./CreateExpenseOrCategory";

function ExpenseOption() {
  return (
    <Tabs variant="soft-rounded" colorScheme="gray" align="center" marginTop={10}>
      <TabList>
        <Tab>
          <Text fontSize="xl">By date</Text>
        </Tab>
        <Tab>
          <Text fontSize="xl">By category</Text>
        </Tab>
        <Tab>
          <Text fontSize="xl">Create</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
            <ExpensesByDate />
        </TabPanel>
        <TabPanel>
          <ExpensesByCategory />
        </TabPanel>
        <TabPanel>
          <CreateExpenseOrCategory />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ExpenseOption
