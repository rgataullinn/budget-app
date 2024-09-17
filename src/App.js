import React from "react";
import "./App.css";
import ExpenseOption from './components/ExpenseOption';
import "./styles/styles.css"
import Header from "./components/Header";
import {
  ChakraProvider, Box
} from "@chakra-ui/react";

function App() {

  return (
    <ChakraProvider>
      <Box className="App" w="100%" >
        <Header />
        <ExpenseOption />
      </Box>
    </ChakraProvider>
  );
}

export default App;
