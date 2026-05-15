import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton.jsx";
import CountDownTimer from "../UI/CountDownTimer.jsx";
import NFTCard from "../UI/NFTCard.jsx";


const NewItems = () => {
  
    const [newItems, setNewItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      axios
        .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
        .then((response) => {
          setNewItems(response.data);
          setLoading(false);
      })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 992, 
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768, 
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="d-flex">
              {new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-sm-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={100} height={200} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width={100} height={20} />
                      <br />
                      <Skeleton width={60} height={15} />
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <Slider {...settings}>
          {newItems.map((data, index) =>(
            <NFTCard key={index} data={data} className="px-2" />
          ))}
          </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
