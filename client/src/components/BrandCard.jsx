import {
  Flex,
  Link,
  useColorModeValue,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const BrandCard = ({ brandItem }) => {
  const brand = brandItem.name;
  const brandImage = brandItem.image;
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
        minW="300px"
        h="250px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
        rounded="lg"
        position="relative"
        border={`${borderWidth} solid ${borderColor}`}
        _hover={{ boxShadow: "dark-lg" }}
      >
        <Flex
          fontSize="xl"
          fontWeight="semiBold"
          as="h3"
          lineHeight="25px"
          width="100%"
          height="100%"
          textAlign="center"
          minH="50px"
          mb="12px"
          flexDirection="column"
          alignItems="space-between"
          justifyContent="space-between"
          pt="50px"
        >
          <Image
            rounded="lg"
            width="100%"
            h="100px"
            fit="cover"
            src={brandImage}
            alt={brand}
          />
          <Text textTransform="uppercase">
            {brand}
          </Text>
        </Flex>
      </Stack>
    </Link>
  );
};

export default BrandCard;
