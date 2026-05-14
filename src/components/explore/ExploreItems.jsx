import React, { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CountDownTimer from "../UI/CountDownTimer.jsx";
import NFTCard from "../UI/NFTCard.jsx";


const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);


  useEffect(() => { 
    
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setExploreItems(response.data);
        setLoading(false);
        })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      }, []);

  const loadMore = () => {
    setVisibleCount((visibleCount) => visibleCount + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {exploreItems.slice(0, visibleCount).map((exploreItem, index) => (
        <NFTCard
          key={index} 
          data={exploreItem} 
          className="col-lg-3 col-md-6 col-sm-6 col-sm-12" 
         />
      ))}
      {visibleCount < exploreItems.length && (
      <div className="col-md-12 text-center">
        <button onClick={loadMore} id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
