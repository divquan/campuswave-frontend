import React, { useContext, useEffect, useState } from "react";
import "./Write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { GlobalContext } from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [cat, setCategory] = useState(state?.cat || "");
  const navigate = useNavigate();
  const [status, setStatus] = useState("Publish");
  const [selectedFile, setSelectedFile] = useState(null);
  const [publish, setPublish] = useState(false);
  const { logout, currentUser } = useContext(AuthContext);

  const { setError } = useContext(GlobalContext);

  const [imgUrl, setImgUrl] = useState(
    state?.imgUrl ||
      "https://res.cloudinary.com/drdfofs26/image/upload/v1679743925/duirzpg8lqf5wt0k3mm8.png"
  );

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const upload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      setStatus("Uploading...");
      const response = await axios.post(
        "https://campus-backend.onrender.com/api/upload",
        formData
      );
      console.log(1);
      setPublish(true);
      setImgUrl(response.data.url);
      setStatus("almost done...");
    } catch (error) {
      console.error(error);
      setStatus("Couldn't upload");
      setTimeout(() => setStatus("Publish"), 4000);
      console.log(2);
      return setError({ show: true, message: error.message, color: "red" });
    }
  };
  const handleSubmit = async () => {
    //client-side post validation
    if (!title)
      return setError({
        color: "red",
        show: true,
        message: " Title cannot be empty",
      });
    if (value.length < 15)
      return setError({
        color: "red",
        show: true,
        message: " Description cannot be empty",
      });
    if (!cat)
      return setError({
        color: "red",
        show: true,
        message: "Please select category",
      });
    if (!selectedFile)
      return setError({
        color: "red",
        show: true,
        message: "Please choose an image",
      });

    setStatus("Publishing...");

    try {
      setPublish(false);
      const postData = new FormData();
      postData.append("title", title);
      postData.append("description", value);
      postData.append("category", cat);
      postData.append("uid", currentUser.id);
      postData.append("url", imgUrl);
      const res = await axios.post(
        "https://campus-backend.onrender.com/api/posts/",
        postData
      );
      setStatus("Published");
      setError({
        color: "green",
        message: "Post has been published",
        show: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      setStatus("Couldn't publish");
      setTimeout(() => setStatus("Publish"), 4000);
    }
  };
  useEffect(() => {
    if (publish) {
      handleSubmit();
    }
  }, [publish]);

  return (
    <>
      {true ? (
        <div className="write_container-main">
          <div className="write_container">
            <div className="write_container-left">
              <input
                type="text"
                placeholder="Title..."
                value={title}
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
              <div className="editor">
                <ReactQuill theme="snow" value={value} onChange={setValue} />
              </div>
            </div>
            <div className="write_container-right">
              <div className="write_publish">
                <h2>Publish</h2>
                <p>
                  <b>Status: </b>Draft
                </p>

                <p>
                  <b>Visibilty: </b>Public
                </p>
                <input
                  required
                  type="file"
                  // style={{ display: "none" }}
                  name="file"
                  id="file"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file" className="file">
                  Upload image...
                </label>
                <div className="buttons">
                  <button
                    className="btn-fill"
                    onClick={upload}
                    disabled={publish}
                  >
                    {status}
                  </button>
                  {/* <button>Save as Draft</button> */}
                </div>
              </div>
              <br />
              <div className="write_categories">
                <h2>Categories</h2>
                <div className="cat">
                  <input
                    required
                    name="cat"
                    id="knust"
                    type="radio"
                    value="knust"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={cat === "knust" && true}
                  />
                  <label htmlFor="knust">KNUST</label>
                </div>
                <div className="cat">
                  <input
                    required
                    name="cat"
                    id="ug"
                    type="radio"
                    value="ug"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={cat === "ug" && true}
                  />
                  <label htmlFor="ug">UG</label>
                </div>
                <div className="cat">
                  <input
                    required
                    name="cat"
                    id="uner"
                    type="radio"
                    value="uner"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={cat === "uner" && true}
                  />
                  <label htmlFor="uner">UNER</label>
                </div>
                <div className="cat">
                  <input
                    required
                    name="cat"
                    id="uds"
                    type="radio"
                    value="uds"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={cat === "uds" && true}
                  />
                  <label htmlFor="uds">UDS</label>
                </div>
                <div className="cat">
                  <input
                    required
                    name="cat"
                    id="ucc"
                    type="radio"
                    value="ucc"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={cat === "ucc" && true}
                  />
                  <label htmlFor="ucc">UCC</label>
                </div>
                <div className="cat">
                  <input
                    required
                    name="cat"
                    id="umat"
                    type="radio"
                    value="umat"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={cat === "umat" && true}
                  />
                  <label htmlFor="umat">UMat</label>
                </div>
                <div className="cat">
                  <input
                    required
                    name="cat"
                    id="uew"
                    type="radio"
                    value="uew"
                    onChange={(e) => setCategory(e.target.value)}
                    checked={cat === "uew" && true}
                  />
                  <label htmlFor="uew">UCC</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="logged-out">
          <h4>You will have to login in before you can write a post</h4>
          <Link to={"/login"}> Login</Link>
        </div>
      )}
    </>
  );
};

export default Write;
