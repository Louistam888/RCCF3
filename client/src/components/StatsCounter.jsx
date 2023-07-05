import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const StatsCounter = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
      <Box px={10}>
        <Box>{counterOn && <CountUp start={0} end={100} duration={2} delay={0} />} +</Box>
      </Box>
    </ScrollTrigger>
  );
};

export default StatsCounter;
