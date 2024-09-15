import React, {useState, useEffect} from "react";
import { Text, Box } from "@chakra-ui/react";
import axios from "axios";

function Header() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    axios
      .get("https://budget-app-api-production.up.railway.app/totalSpent")
      .then((response) => {
        const data = response.data.totalSpent;
        setTotalSpent(data);
      })
      .catch((error) => {
        console.error("Error fetching total:", error);
      });
  }, []);

  return (
    <Box mt={5}>
      <Text fontSize="3xl">Total spend</Text>
      <Text fontSize="4xl" color="black">${totalSpent}</Text>
    </Box>
  );
}

export default Header;
