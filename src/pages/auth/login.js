import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, Flex, Grid, Input } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.log("error", error);
      alert("Login failed!", error);
    }
  };

  return (
    <>
      <Grid templateColumns="repeat(2,1fr)">
        <Box background="gray.200">This must be an image</Box>
        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            px={4}
            gap={3}
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" colorScheme="purple">
              Login
            </Button>
          </Flex>
        </form>
      </Grid>
    </>
  );
};

export default Login;
