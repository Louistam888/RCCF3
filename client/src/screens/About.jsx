import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box>
      <Box pt="90px" position="relative" h={{ base: "70vh", md: "100vh" }}>
        <Box
          backgroundImage={`linear-gradient(to bottom, rgba(50, 50, 50, 0.1) 0%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 1) 100%), url("assets/about.jpg")`}
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
                <span className="rccfRed">About&nbsp;</span> us
              </Flex>
            </Heading>
          </Flex>
        </Box>
      </Box>

      {/* INFO SECTION */}
      <Box px="30px" my="25px">
        <Heading
          as="h2"
          size="h2Black"
          textTransform="uppercase"
          fontSize="4xl"
        >
          {" "}
          about us
        </Heading>
        <Flex gap="10px">
          <Box
            h="300px"
            w={{ base: "100%", lg: "40%" }}
            backgroundImage={`url("assets/greenchair.jpg")`}
            backgroundCover="cover"
            backgroundPosition="center center"
            backgroundRepeat="no repeat"
          ></Box>

          <Flex
            w={{ base: "100%", lg: "60%" }}
            gap="8px"
            direction="column"
            fontSize="xl"
            lineHeight="22px"
            justifyContent="center"
          >
            <Text>
              Since 1990, Royal Canadian Chair Force has been selling
              top-quality chairs for those working in tech.
            </Text>
            <Text>
              Starting in the early 2000s, we expanded our product line into
              gaming chairs. We quickly found that there is a huge demand, and
              since 2005 we've switched over to selling gaming chairs
              exclusively.
            </Text>
            <Text>
              We sell only the highest-quality gaming chairs to both
              professional and casual gamers. We are a factory-authorized dealer
              of numerous high-end gaming chair brands, including RK Racing,
              Republic of Gamers, Dragon War and more.
            </Text>
            <Text>
              Give your back the break it deserves. Check out our lineup of
              chairs today!
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default About;
