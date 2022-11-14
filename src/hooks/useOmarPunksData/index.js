import { useCallback, useEffect, useState } from "react";
import useOmarPunks from "../useOmarPunks";

const getPunksData = async ({ omarPunks, tokenId }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    omarPunks.methods.tokenURI(tokenId).call(),
    omarPunks.methods.tokenDNA(tokenId).call(),
    omarPunks.methods.ownerOf(tokenId).call(),
    omarPunks.methods.getAccessoriesType(tokenId).call(),
    omarPunks.methods.getAccessoriesType(tokenId).call(),
    omarPunks.methods.getClotheColor(tokenId).call(),
    omarPunks.methods.getClotheType(tokenId).call(),
    omarPunks.methods.getEyeType(tokenId).call(),
    omarPunks.methods.getEyeBrowType(tokenId).call(),
    omarPunks.methods.getFacialHairColor(tokenId).call(),
    omarPunks.methods.getFacialHairType(tokenId).call(),
    omarPunks.methods.getHairColor(tokenId).call(),
    omarPunks.methods.getHatColor(tokenId).call(),
    omarPunks.methods.getGraphicType(tokenId).call(),
    omarPunks.methods.getMouthType(tokenId).call(),
    omarPunks.methods.getSkinColor(tokenId).call(),
    omarPunks.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    tokenURI,
    dna,
    owner,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    ...metadata,
  };
};

//Plural
const useOmarPunksData = () => {
  const [punks, setPunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const omarPunks = useOmarPunks();

  const update = useCallback(async () => {
    if (omarPunks) {
      setLoading(true);

      let tokenIds;

      const totalSupply = await omarPunks.methods.totalSupply().call();
      tokenIds = new Array(parseInt(totalSupply))
        .fill()
        .map((_, index) => index);

      const punksPromise = tokenIds.map((tokenId) =>
        getPunksData({ omarPunks, tokenId })
      );

      const punks = await Promise.all(punksPromise);

      setPunks(punks);

      setLoading(false);
    }
  }, [omarPunks]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

//Singular
const useOmarPunkData = (tokenId = null) => {
  const [punk, setPunk] = useState({});
  const [loading, setLoading] = useState(true);
  const omarPunks = useOmarPunks();

  const update = useCallback(async () => {
    if (omarPunks && tokenId != null) {
      setLoading(true);

      const resultPunk = await getPunksData({ omarPunks, tokenId });
      setPunk(resultPunk);

      setLoading(false);
    }
  }, [omarPunks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    punk,
    loading,
    update,
  };
};

export { useOmarPunksData, useOmarPunkData };
