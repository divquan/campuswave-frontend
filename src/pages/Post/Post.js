import React, { useContext, useEffect, useState } from "react";
// import image from "../../assets/logo-black.png";
import "./Post.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
// import profile from "../../assets/profile.jpg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import DOMPurify from "dompurify";
import { testPosts } from "../../Data";

const Post = () => {
  const [post, setPost] = useState({});
  const link = useLocation().pathname;
  const postId = link.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const fetchPosts = async (postId) => {
    try {
      const res = await axios.get(
        `https://campus-backend.onrender.com/api/posts/${postId}`
      );
      setPost(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts(postId);
  }, [postId]);
  return (
    <div className="post_container">
      <div className="post_image">
        <img src={post.img} alt="" />
      </div>
      <div className="post_menu">
        <div className="post_menu-left">
          <img src={post.userImg} alt="author name" />
          <div>
            <span>
              <b>{post.username}</b>
            </span>
            <span>{post.date}</span>
          </div>
        </div>
        {currentUser?.username === post.username && (
          <div className="post_menu-right">
            <Link to={`/write?edit=${postId}`} state={post}>
              <AiFillEdit size={24} className="edit" />
            </Link>
            <AiFillDelete size={24} className="delete" />
          </div>
        )}
      </div>
      <h1>{post.title}</h1>
      <div className="post_content">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.description),
          }}
        />
        {/* <div
          dangerouslySetInnerHTML={{
            __html: post?.description,
          }}
        /> */}
      </div>
    </div>
  );
};

export default Post;
