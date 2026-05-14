import React, { useState, useEffect }from "react";
import axios from "axios";
import NFTCard from "../UI/NFTCard.jsx";
import Skeleton from "../UI/Skeleton.jsx";


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

  const filterItems = (event) => {
    const selectedValue = event.target.value;
    setLoading(true);

    const url = selectedValue
    ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedValue}`
    : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    axios
      .get(url)
      .then((response) => {
        setExploreItems(response.data);
        setVisibleCount(8);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };


  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterItems}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ?(
        new Array(8).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-sm-12" key={index}>
            <Skeleton width={300} height={400} />
          </div>
        ))
      ) : (
        <>
          {exploreItems.slice(0, visibleCount).map((exploreItem, index) => (
            <NFTCard
              key={exploreItem.id || index} 
              data={exploreItem} 
              className="col-lg-3 col-md-6 col-sm-6 col-sm-12" 
            />
          ))}
        </>
      )}
      {!loading && visibleCount < exploreItems.length && (
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
