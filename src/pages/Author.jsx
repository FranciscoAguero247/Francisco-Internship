import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorId }  = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then((response) => {
        setAuthor(response.data);
        setFollowers(response.data.followers);
        setIsFollowing(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); 
      });
  }, [authorId]);

  const handleFollowToggle = (e) => {
    e.preventDefault();
  
    if(isFollowing){
      setFollowers((prev)=> prev - 1);
      setIsFollowing(false);
    }else{
      setFollowers((prev)=> prev + 1);
      setIsFollowing(true);
    }
  }
    
  if(!author && !loading){
    return <div className="text-center mt-90">Author not found</div>; 
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    
                    <div className="profile_avatar">
                      {loading ? (
                      <Skeleton width={100} height={100} borderRadius={50} />
                      ) : (
                        <>
                        <img src={author?.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        </>
                      )}
                        <div className="profile_name">
                          <h4>
                          {loading ? (
                            <>
                              <Skeleton width={200} height={24} borderRadius={4} />
                              <span className="profile_username">
                                <Skeleton width={100} height={16} borderRadius={4} />
                              </span>
                            </>
                          ) : (
                            <>
                              {author?.authorName}
                              <span className="profile_username">@{author?.tag}</span>
                            </>
                          )}
                          <span id="wallet" className="profile_wallet">
                            {loading ? <Skeleton width={180} height={16} borderRadius={4} /> : author?.address}
                          </span>  
                          
                          {!loading && (
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          )}
                        </h4>
                        </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? <Skeleton width={100} height={20} borderRadius={4} /> : `${followers} followers`}
                      </div>
                      {loading ? (
                        <Skeleton width={110} height={40} borderRadius={6} />
                      ) : (
                        <Link to="#" className="btn-main" onClick={handleFollowToggle}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems 
                  nftData={author?.nftCollection} 
                  authorId={authorId}
                  authorImage={author?.authorImage}
                  loading={loading}
                   />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
