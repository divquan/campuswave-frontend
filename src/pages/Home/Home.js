import React from "react";
import "./Home.scss";
import { posts } from "../../Data";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-container">
      {posts.map((post) => {
        return (
          <div key={post.id} className="home-post">
            <div className="img">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="post-content">
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <Link to={`/post/${post.id}`}>Read more</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
