import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("blackAlpha.100", "gray.800")}
      color={useColorModeValue("white", "gray.200")}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("pink.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © {new Date().getFullYear()} Original avatars designs by
            <Link ml={1} href="https://twitter.com/pablostanley">
              Pablo Stanley 🎨
            </Link>
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
