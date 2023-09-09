import { Flex, Box, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Rating = ({ rating, numReviews }) => {
  const { iconSize, setIconSize } = useState("14px");

  return (
    <Flex flexDirection="column" pb="5px">
      <Box spacing="2px">
        <StarIcon color={rating >= 1 ? "orange.500" : "gray"} />
        <StarIcon color={rating >= 2 ? "orange.500" : "gray"} />
        <StarIcon color={rating >= 3 ? "orange.500" : "gray"} />
        <StarIcon color={rating >= 4 ? "orange.500" : "gray"} />
        <StarIcon color={rating >= 5 ? "orange.500" : "gray"} />
      </Box>
      <Text ml="3px">{`${numReviews} ${
        numReviews === 1 ? "Review" : "Reviews"
      }`}</Text>
    </Flex>
  );
};

export default Rating;
