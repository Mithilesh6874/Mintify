export const getCreators = (nfts) => {
  const finalized = [];

  if (nfts) {
    const creators = nfts.reduce((creatorObject, nft) => {
      (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);

      return creatorObject;
    }, {});

    Object.entries(creators).map((creator) => {
      const seller = creator[0];
      const sum = creator[1]
        .map((item) => Number(item.price))
        .reduce((prev, curr) => prev + curr, 0);
      console.log(creator, "creators");
      const image = creator[1][0].image;
      finalized.push({ seller, sum, image });
    });
    console.log(finalized, "finalized");
    return finalized;
  }
};
