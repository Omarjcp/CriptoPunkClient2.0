import {
  Box,
  Button,
  Heading,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import PunkCard from "../../components/punk-card";
import RequestAccess from "../../components/request-access";
import useOmarPunks from "../../hooks/useOmarPunks";
import { useOmarPunkData } from "../../hooks/useOmarPunksData";

const Punk = () => {
  const toast = useToast();
  const { tokenId } = useParams();
  const { active, account, library } = useWeb3React();
  const omarPunksContract = useOmarPunks();
  const { loading, punk, update } = useOmarPunkData(tokenId);
  const [isTransfering, setIsTransfering] = useState(false);

  const transfer = () => {
    setIsTransfering(true);

    const address = prompt("Into your address:");
    const isAddres = library.utils.isAddress(address);

    if (!isAddres) {
      setIsTransfering(false);
      toast({
        title: "Addres incorrect",
        description: "Address don't get to Ethereum",
        status: "error",
      });
      return;
    }

    omarPunksContract.methods
      .safeTransferFrom(punk.owner, address, tokenId)
      .send({ from: account })
      .on("error", (error) => {
        setIsTransfering(false);
        toast({
          title: "Transaction error",
          description: error.message,
          status: "error",
        });
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transaction send",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setIsTransfering(false);
        toast({
          title: "Transaction successful",
          description: `The punk now belongs to ${address}`,
          status: "success",
        });
        update();
      });
  };

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack>
        <PunkCard
          mx={{
            base: "auto",
            md: 0,
          }}
          name={punk.name}
          image={punk.image}
        />
        <Button
          isLoading={isTransfering}
          onClick={transfer}
          disabled={account !== punk.owner}
          colorScheme="pink"
        >
          {account !== punk.owner ? "You aren't the owner" : "Transfer"}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading color="pink.300">{punk.name}</Heading>
        <Text fontSize="xl" color="whiteAlpha.900">
          {punk.description}
        </Text>
        <Text fontWeight={600} color="whiteAlpha.900">
          DNA:
          <Tag ml={2} colorScheme="pink">
            {punk.dna}
          </Tag>
        </Text>
        <Text fontWeight={600} color="whiteAlpha.900">
          Owner:
          <Tag ml={2} colorScheme="pink">
            {punk.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th color="whiteAlpha.900" fontWeight="700">
                Attributes
              </Th>
              <Th color="whiteAlpha.900">Values</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(punk.attributes).map(([key, value]) => (
              <Tr key={key}>
                <Td color="whiteAlpha.900">{key}</Td>
                <Td>
                  <Tag color="pink.400" fontWeight={700}>
                    {value}
                  </Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default Punk;
