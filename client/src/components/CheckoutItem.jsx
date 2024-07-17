import {
  Flex,
  useColorModeValue as mode,
  Image,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";

const CheckoutItem = ({ cartItem }) => {
  const { name, image, price, qty } = cartItem;
  return (
    <>
      <Flex>
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Flex
          direction="column"
          align="stretch"
          flex="1"
          mx="2px"
          spacing="4px"
        >
          <Text>{name}</Text>
          <Text>
            Qty: {qty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </Text>
          <Text>
            Unit price: $
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </Text>
        </Flex>
        <Box>
          <Text fontWeight="bold">
            ${(price * qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </Box>
      </Flex>
      <Divider bg={mode("gray.400", "gray.800")} />
    </>
  );
};

export default CheckoutItem;
