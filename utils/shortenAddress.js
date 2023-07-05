export const shortenAddress = (address) => {
  if (typeof address !== "string") {
    return "";
  }
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
