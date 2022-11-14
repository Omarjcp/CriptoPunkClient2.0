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
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import PunkCard from "../../components/punk-card";
import RequestAccess from "../../components/request-access";
import { useOmarPunkData } from "../../hooks/useOmarPunksData";

const Punk = () => {
  const { tokenId } = useParams();
  const { active, account } = useWeb3React();
  const { loading, punk } = useOmarPunkData(tokenId);

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
        <Button disabled={account !== punk.owner} colorScheme="pink">
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
