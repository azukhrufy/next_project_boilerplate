import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/swrs/user";
import { Button, Flex } from "@chakra-ui/react";

const Idle = () => {
  const { logout } = useAuth();
  const { data, isLoading, isError } = useUser("671161d6f1ca3f2deee30a34");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data.</div>;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error) {
      console.log("error", error);
      alert("Logout failed!", error);
    }
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <div>Welcome, {data?.name}!</div>
      <Button onClick={(e) => handleLogout(e)}>Logout</Button>
    </Flex>
  );
};

export default Idle;
