import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import OmarPunksArtifact from "../../config/web3/artifacts/OmarPunks";

const { address, abi } = OmarPunksArtifact;

const useOmarPunks = () => {
  const { active, library, chainId } = useWeb3React();

  const omarPunks = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return omarPunks;
};

export default useOmarPunks;
