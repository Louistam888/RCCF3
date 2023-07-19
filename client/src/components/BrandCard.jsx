import { Box, Flex, Link, useColorModeValue, Stack, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const BrandCard = ({ brand }) => {
  const borderColor = useColorModeValue("gray", "white");
  const borderWidth = useColorModeValue("1px", "2px");

  return (
    <Link
      as={ReactLink}
      to={`/shop/${brand}`}
      pt="2"
      cursor="pointer"
      _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
    >
      <Stack
        p="2"
        spacing="3px"
        minW="240px"
        h="550px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
        rounded="lg"
        position="relative"
        border={`${borderWidth} solid ${borderColor}`}
        _hover={{ boxShadow: "dark-lg" }}
      >
        {/* <Image src={product.image} alt={product.name} w="100%" h="auto" objectFit="auto" rounded="5px" /> */}
        <Flex m="10px" justifyContent="center" alignItems="center" flexDirection="column">
          <Box
            fontSize="xl"
            fontWeight="semiBold"
            as="h3"
            lineHeight="25px"
            width="100%"
            textAlign="center"
            minH="50px"
            mb="12px"
          >
            <Text textTransform="uppercase">{brand}</Text>
          </Box>
        </Flex>
      </Stack>
    </Link>
  );
};

export default BrandCard;
