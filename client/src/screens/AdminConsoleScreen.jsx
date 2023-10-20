import {
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersTab from "../components/UsersTab";

const AdminConsoleScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo && userInfo.isAdmin === "true" ? (
    <Box px="20px" pb="20px" pt="90px">
      <Stack
        direction={{ base: "column", lg: "row" }}
        alignItems={{ lg: "flex-start" }}
      >
        <Stack
          pr={{ base: "0", md: "14px" }}
          spacing={{ base: "8px", md: "10px" }}
          flex="1.5"
          mb={{ base: "12px", md: "none" }}
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Admin Console
          </Heading>
          <Tabs>
            <TabList>
              <Tab>Users</Tab>
              <Tab>Products</Tab>
              <Tab>Reviews</Tab>
              <Tab>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default AdminConsoleScreen;