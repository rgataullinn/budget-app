import React from "react";
import { Tabs, Tab, TabPanels, TabPanel, TabList, Text } from "@chakra-ui/react";
import ExpensesByCategory from "./categories/ExpensesByCategory";
import ExpensesByDate from "./dates/ExpenseByDate";
import CreateExpenseOrCategory from "./CreateExpenseOrCategory";

function ExpenseOption({month}) {
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
            <ExpensesByDate
              month={month} />
        </TabPanel>
        <TabPanel>
          <ExpensesByCategory
              month={month} />
        </TabPanel>
        <TabPanel>
          <CreateExpenseOrCategory month={month}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ExpenseOption
