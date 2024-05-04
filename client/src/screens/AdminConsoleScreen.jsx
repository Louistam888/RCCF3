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
import BrandsTab from "../components/BrandsTab";
import ProductsTab from "../components/ProductsTab";
import ReviewsTab from "../components/ReviewsTab";
import OrdersTab from "../components/Orders.Tab";

export const convertImage = (uploadedFile, setterFunction, toast) => {
  const file = uploadedFile.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setterFunction(reader.result);
  };
  reader.onerror = (error) => {
    toast({
      description: `Upload failed ${error}`,
      status: "error",
      isClosable: true,
    });
  };
  reader.readAsDataURL(file);
};

const AdminConsoleScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo && userInfo.isAdmin === true ? (
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
              <Tab>Brands</Tab>
              <Tab>Products</Tab>
              <Tab>Reviews</Tab>
              <Tab>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersTab />
              </TabPanel>
              <TabPanel>
                <BrandsTab />
              </TabPanel>
              <TabPanel>
                <ProductsTab />
              </TabPanel>
              <TabPanel>
                {/* <ReviewsTab /> */}
              </TabPanel>
              <TabPanel>
                {/* <OrdersTab /> */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    // <Navigate to="/login" replace={true} state={{ from: location }} />
    null
  );
};

export default AdminConsoleScreen;
