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
      console.log(res.data.img);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts(cat);
  }, [cat]);

  return (
    <div className="home-container">
      {posts.map((post, index) => (
        <div key={post.id} className="home-post">
          <div className="img">
            {post.image === null ? (
              <img style={{}} src={Img} alt={post.title} />
            ) : (
              <img src={post.img} alt={post.title} />
            )}
          </div>
          <div className="post-content">
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <Link to={`/post/${post.id}`}>Read more</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
