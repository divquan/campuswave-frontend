import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import Img from "../../assets/logo-black.png";
import Loader from "../../components/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import DOMPurify from "dompurify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cat = useLocation().search;
  const [apistatus, setApistatus] = useState(null);
  const { setError } = useContext(GlobalContext);

  const fetchPosts = async (cat) => {
    try {
      const res = await axios.get(
        `https://campuswave.netlify.app/api/posts/${cat}`
      );
      setPosts(res.data.reverse());
      setLoading(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setError({ show: true, message: err.message, color: "red" });
      setLoading(false);
      setApistatus(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts(cat);
  }, [cat]);

  return (
    <div className="home-container">
      {loading && <Loader />}

      {/* {apistatus && <h2>{apistatus}</h2>} */}
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
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.description?.slice(0, 250)),
                }}
              ></p>
              <Link to={`/post/${post.id}`}>Read more</Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
