import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOmarPunks from "../../hooks/useOmarPunks";

const Home = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [supply, setSupply] = useState({
    max: 0,
    total: 0,
  });

  const { active, account } = useWeb3React();
  const omarPunksContract = useOmarPunks();

  const getPlatziPunksData = useCallback(async () => {
    if (omarPunksContract) {
      const resultMaxSupplay = await omarPunksContract.methods
        .maxSupply()
        .call();
      const resultTotalSupply = await omarPunksContract.methods
        .totalSupply()
        .call();
      const dnaPreview = await omarPunksContract.methods
        .deterministicPseudoRandomDNA(resultTotalSupply, account)
        .call();
      const image = await omarPunksContract.methods
        .imageByDNA(dnaPreview)
        .call();

      setSupply({
        max: resultMaxSupplay,
        total: resultTotalSupply,
      });

      setImageSrc(image);
    }
  }, [omarPunksContract, account]);

  useEffect(() => {
    getPlatziPunksData();
  }, [getPlatziPunksData]);

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 0,
              left: 0,
              bg: "green.400",
              zIndex: -1,
              borderRadius: "50%",
            }}
          >
            Un Omar Punk
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            nunca para de aprender
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Omar Punks es una colección de Avatares randomizados cuya metadata es
          almacenada on-chain. Poseen características únicas y sólo hay{" "}
          actualmente <Badge color="green.500">{supply.total}</Badge> en
          existencia y habrá un máximo de{" "}
          <Badge color="green.500">{supply.max}</Badge> Omar Punks.
        </Text>
        <Text color={"green.500"}>
          Cada Omar Punk se genera de forma secuencial basado en tu address, usa
          el previsualizador para averiguar cuál sería tu Omar Punk si minteas
          en este momento
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!omarPunksContract}
          >
            Obtén tu punk
          </Button>
          <Link to="/punks">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  1
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getPlatziPunksData}
              mt={4}
              size="xs"
              colorScheme="green"
            >
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;
