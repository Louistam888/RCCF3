import { Box, Flex, Heading } from "@chakra-ui/react";
import StatsCounter from "../components/StatsCounter";

const LandingScreen = () => {
  return (
    <Box>
      {/* MAIN IMAGE COMPONENT */}
      <Box pt="90px" position="relative" h={{ base: "70vh", md: "100vh" }}>
        <Box
          backgroundImage={`linear-gradient(to bottom, rgba(50, 50, 50, 0.1) 0%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 1) 100%), url("assets/mainimage.jpg")`}
          w="100%"
          h="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center top"
        >
          <Flex
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            alignItems="flex-end"
            justifyContent="center"
            pb={{ base: "20%", sm: "10%", lg: "6%" }}
          >
            <Heading
              textTransform="uppercase"
              color="white"
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl", lg: "7xl" }}
            >
              <Flex justifyContent="center" className="mainFade1">
                <span className="rccfRed">Game&nbsp;</span> at the next level
              </Flex>
              <Flex
                fontSize={{ base: "sm", sm: "xl", md: " 2xl", lg: "4xl" }}
                justifyContent="center"
                className="mainFade2"
              >
                Your throne awaits
              </Flex>
            </Heading>
          </Flex>
        </Box>
      </Box>

      {/* STATS SECTION */}

      <Flex>
        <StatsCounter />
      </Flex>
    </Box>
  );
};

export default LandingScreen;
