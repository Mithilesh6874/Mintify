import { useState, useEffect, useRef, useContext } from "react";
import { Loader, Banner, CreatorCard, SearchBar } from "../components";
import { makeId } from "../  /makeId";
import { getCreators } from "../utils/getTopCreators";
import images from "../assets";
import Image from "next/image";
import { useTheme } from "next-themes";
import NFTCard from "../components/NFTCard";
import { NFTContext } from "../context/NFTContext";

const Home = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [hideButtons, sethideButtons] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [AllTopCreators, getAllTopCreators] = useState([]);

  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeSelect, setActiveSelect] = useState("Recently added");
  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items.reverse());
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const topCreators = getCreators(nfts);
    getAllTopCreators(topCreators);
  }, [nfts]);
  useEffect(() => {
    const sortedNfts = [...nfts];
    switch (activeSelect) {
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);
  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      sethideButtons(false);
    } else {
      sethideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });
  const creators = getCreators(nfts);
  console.log(AllTopCreators, "AllTopCreators");
  return (
    <div>
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full minmd:w-4/5">
          <Banner
            name={
              <>
                Discover, collect and sell <br /> extraordinary NFTs{" "}
              </>
            }
            childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
            parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          />
          {/* {!isLoading && !nfts.length ? (
            <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">That&apos;s weird... No NFTs for sale!</h1>
          ) : isLoading ? <Loader /> : (
            <> */}
          <div>
            <h1
              className="font-poppins dark:text-white
    text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0"
            >
              Best Creators
            </h1>

            <div
              className="realative flex-1 max-w-full flex mt-3"
              ref={parentRef}
            >
              <div
                className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                ref={scrollRef}
              >
                {AllTopCreators.map((creator, i) => (
                  // console.log(creator, "creator");
                  //  }
                  <CreatorCard
                    key={creator}
                    rank={i + 1}
                    creatorImage={creator.image}
                    creatorName={`${creator.seller.substring(
                      1,
                      5
                    )}...${creator.seller.substring(5, 9)}`}
                    creatorEths={creator.sum}
                  />
                ))}
                {/* {[6, 7, 8, 9, 10].map((i) => (
                  <CreatorCard
                    key={`creator-${i}`}
                    rank={i}
                    creatorImage={images[`creator${i}`]}
                    creatorName={`0x${makeId(3)}...${makeId(4)}`}
                    creatorEths={10 - i * 0.5}
                  />
                ))} */}
                {!hideButtons && (
                  <>
                    <div
                      onClick={() => handleScroll("left")}
                      className={`absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0 ${
                        !hideButtons ? "arrowcls" : ""
                      }`}
                    >
                      <Image
                        src={images.left}
                        layout="fill"
                        objectFit="contain"
                        alt="left_arrow"
                        className={
                          theme === "light" ? "filter invert" : undefined
                        }
                      />
                    </div>
                    <div
                      onClick={() => handleScroll("right")}
                      className={`absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0  ${
                        !hideButtons ? "arrowcls" : ""
                      }`}
                    >
                      <Image
                        src={images.right}
                        layout="fill"
                        objectFit="contain"
                        alt="left_arrow"
                        className={
                          theme === "light" ? "filter invert" : undefined
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
              <h1 className="flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                Hot NFTs
              </h1>
              <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                <SearchBar
                  activeSelect={activeSelect}
                  setActiveSelect={setActiveSelect}
                  handleSearch={onHandleSearch}
                  clearSearch={onClearSearch}
                />
              </div>
            </div>
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
              {nfts.map((nft) => (
                <NFTCard key={nft.tokenId} nft={nft} />
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <NFTCard
                  key={`nft-${i}`}
                  nft={{
                    i,
                    name: `Nifty NFT ${i}`,
                    price: (10 - i * 0.534).toFixed(2),
                    seller: `0x${makeId(3)}...${makeId(4)}`,
                    owner: `0x${makeId(3)}...${makeId(4)}`,
                    description: "Cool NFT on Sale",
                    tokenId: "11",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
