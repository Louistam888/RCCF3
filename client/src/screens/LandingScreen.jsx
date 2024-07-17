import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
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

      {/* INTRO SECTION */}
      <Box mx="30px" my="50px">
        <Heading
          textTransform="uppercase"
          textAlign="center"
          lineHeight="30px"
          fontWeight="semibold"
        >
          We carry the best brands in canada
        </Heading>
        <Text mt="10px" fontSize="xl">
          Your back should hurt from carrying your team. Not from sitting. An
          ergonomically-designed professional gaming chair will do wonders for
          your neck and back as you lead your clan to victory. Whether you are a
          professional or semi-professional gamer, we've got a chair to take
          your raids to the next level!
        </Text>
      </Box>

      {/* DELIVERY SECTION */}

      <Box mx={{ base: "0", lg: "30px" }} my="50px">
        <Flex
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
          justifyContent={{ base: "center", lg: "space-between" }}
          backgroundImage={`linear-gradient(to bottom, rgba(50, 50, 50, 0.1) 0%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 1) 100%),url("assets/bluetech.jpg")`}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          color="white"
          h={{ base: "auto", lg: "500px" }}
        >
          <Box
            backgroundImage={`url(assets/delivery.jpg)`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center center"
            w={{ base: "100%", lg: "40%" }}
            h="100%"
            display={{ base: "none", lg: "block" }}
          ></Box>

          <Flex
            w={{ base: "100%", lg: "50%" }}
            mr={{ base: 0, lg: "30px" }}
            p={{ base: "30px", lg: "0" }}
            direction="column"
            justifyContent="center"
          >
            <Heading
              textTransform="uppercase"
              lineHeight="30px"
              fontWeight="semibold"
              textAlign={{ base: "center", lg: "left" }}
              mb="10px"
            >
              We offer free delivery!
            </Heading>
            <Text mt="10px" fontSize="xl">
              We bring your new gaming chair right to your doorstep, ready to go
              with our free home delivery service. No assembly required! Live
              outside of Canada? No problem! We are also on Amazon Prime, so we
              can get your gaming chair to you no matter where in the world you
              are logging in from. Let us take care of all the heavy lifting.
              You just focus on practicing those "360 no scopes."
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* EMAIL CONTACT FORM */}
      {/* <Flex direction="column" mx="30px" my="50px">
        <Heading
          textTransform="uppercase"
          lineHeight="30px"
          fontWeight="semibold"
          textAlign="center"
          mb="10px"
          justifyContent="center"
          alignItems="center"
        >
          contact us
        </Heading>
        <Email />
      </Flex> */}
    </Box>
  );
};

export default LandingScreen;
