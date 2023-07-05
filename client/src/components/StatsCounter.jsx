import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const StatsCounter = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <Flex px={10} w="100%" justifyContent="center" textAlign="center">
      <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
        <Flex justifyContent="center" border="2px solid green" w="100vw">
          <Flex direction="column" border="2px solid red" alignItems="center" w="150px">
            <Text>{counterOn && <CountUp start={0} end={50} duration={2} delay={0} />} million +</Text>
            <Text overflowWrap="break-word">CHAIRS SOLD WORLDWIDE</Text>
          </Flex>
          <Flex direction="column" border="2px solid red" alignItems="center" w="150px">
            <Text>{counterOn && <CountUp start={0} end={90} duration={2} delay={0} />} +</Text>
            <Text overflowWrap="break-word">COUNTRIES SERVED</Text>
          </Flex>
          <Flex direction="column" border="2px solid red" alignItems="center" w="150px">
            <Text>{counterOn && <CountUp start={0} end={180} duration={2} delay={0} />} +</Text>
            <Text overflowWrap="break-word">DISTRIBUTOR PARTNERS</Text>
          </Flex>
        </Flex>
      </ScrollTrigger>
    </Flex>
  );
};

export default StatsCounter;
