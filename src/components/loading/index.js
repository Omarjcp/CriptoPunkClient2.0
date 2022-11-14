import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center my={20}>
      <Spinner color="white" />
    </Center>
  );
};

export default Loading;
