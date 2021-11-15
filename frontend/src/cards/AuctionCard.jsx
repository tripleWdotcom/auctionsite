// import { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
//  import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";

// const { auctionItem, fetchAuctionItem } = useContext(AuctionDetailsContext);

export const AuctionCard = ({auction}) => {
  const history = useHistory();

  const goToAuctionDetails = () => {
    history.push(`/auction-details/${auction.id}`);
  };

 

  return (
    <div onClick={goToAuctionDetails} className="h-30 flex bg-white pb-3">
        {false ? (
          <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"></img>
        ) : (
          <img className="w-32 h-32" src={"uploads/TCd1W34KAG_img1.jpg"} alt="Bild saknas"></img>
          // <img className="w-36 h-36" src={"/uploads/" + auction.imagePath + "_img1.jpg"} alt="Bild saknas"></img>
        )}
        <div className="h-32 flex "></div>
      <div className="h-32 p-2 w-full flex flex-col bg-myAw">
        <div className="h-1/2 black font-medium col-span-3 align-top leading-tight">{auction.title}</div>
        <div className="w-full flex flex-row justify-evenly ">
          <div className="w-1/2 text-black font-bold text-left mt-2">
            {auction.highestBid === "0"
              ? "startPrice"
              : `${auction.highestBid} kr`}
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className=" w-full flex flex-row justify-evenly  mt-0 align-bottom">
          <div className="w-1/3 text-black text-left">{auction.numberOfBids -1} bids</div>
          {/* <div className="">Category: {auction.categoryId}</div> */}
          <div className="w-2/3 text-right text-myRe">
            {<CountdownTimer auctionEndTime={auction.endTime} />}
          </div>
        </div>
      </div>
    </div>
  );
};
