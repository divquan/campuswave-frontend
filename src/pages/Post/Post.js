import React from "react";
import image from "../../assets/logo-black.png";
import "./Post.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="post_container">
      <div className="post_image">
        <img src={image} alt="" />
      </div>
      <div className="post_menu">
        <div className="post_menu-left">
          <img src={profile} alt="author name" />
          <div>
            <span>
              <b>John Doe</b>
            </span>
            <span>Posted 3 days ago</span>
          </div>
        </div>
        <div className="post_menu-right">
          <Link to="/write?edit=2">
            <AiFillEdit size={24} className="edit" />
          </Link>
          <AiFillDelete size={24} className="delete" />
        </div>
      </div>
      <h1>This Is My Title</h1>
      <div className="post_content">
        <p>
          REST (short for representational state transfer) is an architectural
          pattern for application programming interfaces (APIs). There are other
          older patterns such as SOAP and, but of late, the REST pattern has
          gained popularity.
        </p>
        <p>
          Since the APIs are only for internal consumption, you can use any API
          pattern, or even invent your own. But REST is a good pattern to adopt
          because it is simple and has very few constructs. Further, adopting an
          existing popular pattern makes you think about your APIs and schema,
          and organize them better, forcing some best practices
        </p>
        <p>
          There are many architectural constraints that true REST APIs must
          follow. But keeping in mind that the APIs are only for internal
          consumption, we’ll just use a few core concepts of the REST API
          architectural pattern rather than follow it very strictly, which
          requires a lot more work. If you ever decide to expose the APIs to
          others, you can strengthen the RESTfulness of the API set. I’ll
          briefly discuss the core concepts that we will make use of in your API
          design
        </p>
        <p>
          There are many architectural constraints that true REST APIs must
          follow. But keeping in mind that the APIs are only for internal
          consumption, we’ll just use a few core concepts of the REST API
          architectural pattern rather than follow it very strictly, which
          requires a lot more work. If you ever decide to expose the APIs to
          others, you can strengthen the RESTfulness of the API set. I’ll
          briefly discuss the core concepts that we will make use of in your API
          design
        </p>
      </div>
    </div>
  );
};

export default Post;
