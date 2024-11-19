import React, { useState } from "react";
import "./App.css";
import ExpenseOption from "./components/ExpenseOption";
import "./styles/styles.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Login from "./components/Login"; // Import the Login component

const theme = createTheme({
  palette: {
    mode: "light", // or 'dark'
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Box className="App" w="100%">
          {!isLoggedIn ? (
            <Login onLogin={handleLogin} /> 
          ) : (
            <>
              <Header month={11} />
              <ExpenseOption month={11} />
            </>
          )}
        </Box>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
