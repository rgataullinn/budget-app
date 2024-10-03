import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
} from '@chakra-ui/react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('https://budget-app-api-production.up.railway.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      onLogin(); // Call the correct prop function
      toast({
        title: "Logged in",
        description: "Welcome back!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: data.message || 'Login failed!',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width="300px" margin="auto" mt="100px" p="4" borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl mb="4">
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input 
            type="text" 
            id="username" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input 
            type="password" 
            id="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
