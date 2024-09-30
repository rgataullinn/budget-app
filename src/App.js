import React from "react";
import "./App.css";
import ExpenseOption from "./components/ExpenseOption";
import "./styles/styles.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import { ChakraProvider, Box } from "@chakra-ui/react";

const theme = createTheme({
  palette: {
    mode: "light", // or 'dark'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Box className="App" w="100%">
          <Header />
          <ExpenseOption />
        </Box>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
