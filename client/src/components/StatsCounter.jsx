import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const StatsCounter = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <Flex px={10} w="100%" justifyContent="center" textAlign="center" py="30px" >
      <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
        <Flex justifyContent="center" alignItems="center" w="100vw" flexDirection={{ base: "column", sm: "row" }}>
          <Flex
            direction="column"
            alignItems="center"
            w={{ base: "300px", sm: "145px", md: "230px", lg: "310px", xl: "350px" }}
            h={{ base: "150px", sm: "150px", md: "250px", lg: "300px" }}
            mx={{ base: "5px", md: "10px" }}
            justifyContent="center"
            backgroundColor="whiteAlpha.900"
            rounded="5px"
            px="15px"
            my={{ base: "5px", sm: "0" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
          >
            <Text color="brand.red" fontSize={{ base: "4xl", sm: "xl", md: "4xl", lg: "5xl", xl: "6xl" }}>
              {counterOn && <CountUp start={0} end={5000000} duration={2.5} delay={0} />} +
            </Text>
            <Text
              overflowWrap="break-word"
              fontSize={{ base: "lg", sm: "md", md: "xl", lg: "2xl", xl: "3xl" }}
              lineHeight={{ base: "28px", sm: "20px", md: "22px", lg: "25px", xl: "32px" }}
              fontWeight="semibold"
              h={{ base: "auto", md: "64px" }}
              w="100%"
              color="black"
            >
              CHAIRS SOLD WORLDWIDE
            </Text>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            w={{ base: "300px", sm: "145px", md: "230px", lg: "310px", xl: "350px" }}
            h={{ base: "150px", sm: "150px", md: "250px", lg: "300px" }}
            mx={{ base: "5px", md: "10px" }}
            justifyContent="center"
            backgroundColor="whiteAlpha.900"
            rounded="5px"
            px="15px"
            my={{ base: "5px", sm: "0" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
          >
            <Text color="brand.red" fontSize={{ base: "4xl", sm: "xl", md: "4xl", lg: "5xl", xl: "6xl" }}>
              {counterOn && <CountUp start={0} end={90} duration={2.5} delay={0} />} +
            </Text>
            <Text
              overflowWrap="break-word"
              fontSize={{ base: "lg", sm: "md", md: "xl", lg: "2xl", xl: "3xl" }}
              lineHeight={{ base: "28px", sm: "20px", md: "22px", lg: "25px", xl: "32px" }}
              fontWeight="semibold"
              h={{ base: "auto", md: "64px" }}
              w="100%"
              color="black"
            >
              COUNTRIES SERVED
            </Text>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            w={{ base: "300px", sm: "145px", md: "230px", lg: "310px", xl: "350px" }}
            h={{ base: "150px", sm: "150px", md: "250px", lg: "300px" }}
            mx={{ base: "5px", md: "10px" }}
            justifyContent="center"
            backgroundColor="whiteAlpha.900"
            rounded="5px"
            px="15px"
            my={{ base: "5px", sm: "0" }}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
          >
            <Text className="rccfRed" fontSize={{ base: "4xl", sm: "xl", md: "4xl", lg: "5xl", xl: "6xl" }}>
              {counterOn && <CountUp start={0} end={180} duration={2.5} delay={0} />} +
            </Text>
            <Text
              overflowWrap="break-word"
              fontSize={{ base: "lg", sm: "md", md: "xl", lg: "2xl", xl: "3xl" }}
              lineHeight={{ base: "28px", sm: "20px", md: "22px", lg: "25px", xl: "32px" }}
              fontWeight="semibold"
              h={{ base: "auto", md: "64px" }}
              w="100%"
              color="black"
            >
              DISTRIBUTOR PARTNERS
            </Text>
          </Flex>
        </Flex>
      </ScrollTrigger>
    </Flex>
  );
};

export default StatsCounter;
