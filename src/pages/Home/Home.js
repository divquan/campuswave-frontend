import React, { useEffect, useState } from "react";
import "./Home.scss";
// import { posts } from "../../Data";
import Img from "../../assets/logo-black.png";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cat = useLocation().search;
  const fetchPosts = async (cat) => {
    try {
      const res = await axios.get(
        `https://campus-backend.onrender.com/api/posts/${cat}`
      );
      setPosts(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts(cat);
  }, [cat]);

  return (
    <div className="home-container">
      {loading && (
        <h1 className="loading" data-text="It's loading…">
          It's loading…
        </h1>
      )}
      {!loading &&
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
        ))}
    </div>
  );
};

export default Home;
