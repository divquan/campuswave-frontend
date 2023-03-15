import React, { useEffect, useState } from "react";
import "./Home.scss";
// import { posts } from "../../Data";
import Img from "../../assets/logo-black.png";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  const fetchPosts = async (cat) => {
    try {
      const res = await axios.get(`/posts/${cat}`);
      setPosts(res.data);
      console.log(res.data);
      console.log(typeof res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts(cat);
  }, [cat]);

  return (
    <div className="home-container">
      {typeof posts ? (
        posts?.map((post, index) => (
          <div key={index} className="home-post">
            <div className="img">
              {post.image === null ? (
                <img src={Img} alt={post.title} />
              ) : (
                <img src={post.img} alt={post.title} />
              )}
            </div>
            <div className="post-content">
              <h1>{post.title}</h1>
              <p>{post.description?.slice(0, 250)}</p>
              <Link to={`/post/${post.id}`}>Read more</Link>
            </div>
          </div>
        ))
      ) : (
        <h1>Could not load posts, please try again later</h1>
      )}
    </div>
  );
};

export default Home;
