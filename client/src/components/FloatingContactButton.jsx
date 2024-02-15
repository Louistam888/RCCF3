import { useState } from "react";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { BiSupport } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
import { motion } from "framer-motion";

const FloatingContactButton = () => {
  const [showContactIcons, setShowContactIcons] = useState(false); // toggle floating contact buttons

  //CONTACT INFO
  const phoneNumber = 11234567890;
  const email = "rccf@rccf.com";

  //SHOW CONTACT ICONS ON CLICK
  const toggleIcons = () => {
    setShowContactIcons(!showContactIcons);
  };

  //WHATSAPP
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Flex
      direction="column"
      position="fixed"
      bottom={{ base: "20px", lg: "35px" }}
      left={{ base: "15px", lg: "35px" }}
      zIndex="99999"
    >
      <motion.div
        whileTap={{ scale: 0.9 }} // Optional: Add a tap animation effect
      >
        <IconButton
          display="flex"
          alignItems="center"
          justifyContent="center"
          icon={<HiChatBubbleOvalLeftEllipsis />}
          bgColor="brand.red"
          _hover={{ bgColor: "white", color: "black" }}
          _focus={{ bgColor: "white", color: "black" }}
          borderRadius="50%"
          w={{ base: "50px", lg: "60px" }}
          h={{ base: "50px", lg: "60px" }}
          onClick={toggleIcons}
          position="relative"
          fontSize="30px"
          border="2px solid black"
          color="white"
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
          }}
        />
      </motion.div>
      <Flex
        direction="column"
        position="fixed"
        bottom={{ base: "20px", lg: "35px" }}
        left={{ base: "15px", lg: "35px" }}
        zIndex="99999"
      >
        {showContactIcons && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <Tooltip label="Phone" placement="top">
                <IconButton
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  as={ReactLink}
                  to={`tel:${phoneNumber}`}
                  icon={<BiSupport />}
                  fontSize={{ base: "23px", lg: "30px" }}
                  bgColor="brand.red"
                  _hover={{ bgColor: "white", color: "black" }}
                  _focus={{ bgColor: "white", color: "black" }}
                  color="white"
                  border="2px solid black"
                  borderRadius="50%"
                  w={{ base: "40px", lg: "50px" }}
                  h={{ base: "40px", lg: "50px" }}
                  position="absolute"
                  bottom={{ base: "70px", lg: "80px" }}
                  left="5px"
                  style={{
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
                  }}
                  alt="Phone"
                />
              </Tooltip>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: "easeOut", duration: 0.6 }}
            >
              <Tooltip label="WhatsApp" placement="right">
                <IconButton
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  icon={<FaWhatsapp fontSize="25px" />}
                  color="white"
                  onClick={handleWhatsAppClick}
                  _hover={{ bgColor: "white", color: "black" }}
                  _focus={{ bgColor: "white", color: "black" }}
                  bg="#008000"
                  border="2px solid black"
                  borderRadius="50%"
                  w={{ base: "40px", lg: "50px" }}
                  h={{ base: "40px", lg: "50px" }}
                  position="absolute"
                  bottom={{ base: "45px", lg: "55px" }}
                  left={{ base: "50px", lg: "60px" }}
                  style={{
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
                  }}
                  alt="WhatsApp"
                />
              </Tooltip>
            </motion.div>
            <motion.div
              initial={{ opacity: 100, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeOut", duration: 0.7 }}
            >
              <Tooltip label="Email" placement="right">
                <IconButton
                  icon={<MdOutlineEmail />}
                  as={ReactLink}
                  to={`mailto:${email}`}
                  bgColor="brand.red"
                  color="white"
                  _hover={{ bgColor: "white", color: "black" }}
          _focus={{ bgColor: "white", color: "black" }}
                  fontSize="25px"
                  border="2px solid black"
                  borderRadius="50%"
                  w={{ base: "40px", lg: "50px" }}
                  h={{ base: "40px", lg: "50px" }}
                  position="absolute"
                  bottom="0px"
                  left={{ base: "70px", lg: "83px" }}
                  style={{
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
                  }}
                  alt="Email"
                />
              </Tooltip>
            </motion.div>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default FloatingContactButton;
