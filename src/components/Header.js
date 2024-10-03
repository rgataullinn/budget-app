import React, { useState } from "react";
import { Text, Box } from "@chakra-ui/react";

function Header({ month }) {
  const xqr = new XMLHttpRequest();
  const [totalSpent, setTotalSpent] = useState();
  xqr.open('GET', `https://budget-app-api-production.up.railway.app/totalSpent?month=${month}`)
  xqr.onload = () => {
    const response = JSON.parse(xqr.responseText);
    if (xqr.status === 200) {
      setTotalSpent(response.totalSpent);
    }
  }
  xqr.send();

  return (
    <Box mt={5}>
      <Text fontWeight="bold" fontSize="3xl">
        Total spend
      </Text>
      <Text fontSize="4xl" color="black">
        ${totalSpent}
      </Text>
    </Box>
  );
}

export default Header;
