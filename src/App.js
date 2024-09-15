import React from "react";
import "./App.css";
import ExpenseOption from './components/ExpenseOption';
import "./styles/styles.css"
import Header from "./components/Header";
import {
  ChakraProvider
} from "@chakra-ui/react";

function App() {

  return (
    <ChakraProvider >
      <div className="App" w="100%" bg="#f6f6f9">
        <Header />
        <ExpenseOption />
      </div>
    </ChakraProvider>
  );
}

export default App;
