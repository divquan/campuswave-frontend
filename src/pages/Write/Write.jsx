import React, { useEffect, useState } from "react";
import "./Write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [cat, setCategory] = useState(state?.cat || "");
  const navigate = useNavigate();
  const [status, setStatus] = useState("Publish");
  const [selectedFile, setSelectedFile] = useState(null);
  const [publish, setPublish] = useState(false);

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
        "http://localhost:10000/api/upload",
        formData
      );
      setPublish(true);
      setImgUrl(response.data.url);
      console.log(imgUrl);
    } catch (error) {
      console.error(error);
      setStatus("Couldn't upload");
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    setStatus("Publishing...");
    setPublish(false);
    const postData = new FormData();
    postData.append("title", title);
    postData.append("description", value);
    postData.append("category", cat);
    postData.append("uid", 15);
    postData.append("url", imgUrl);

    try {
      const res = await axios.post(
        "http://localhost:10000/api/posts/",
        postData
      );
      setStatus("Published");
      console.log(res);
    } catch (error) {
      console.log(error);
      setStatus("Couldn't publish");
    }
  };
  useEffect(() => {
    if (publish) {
      handleSubmit();
    }
  }, [publish]);

  return (
    <div className="write_container-main">
      {/* <h1 style={{ marginLeft: " 0 0 0 4rem" }}>EDIT:</h1> */}
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
              <button onClick={upload}>{status}</button>
              <button>Save as Draft</button>
            </div>
          </div>
          <br />
          <div className="write_categories">
            <h2>Categories</h2>
            <div className="cat">
              <input
                name="cat"
                id="knust"
                type="radio"
                value="knust"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="knust">KNUST</label>
            </div>
            <div className="cat">
              <input
                name="cat"
                id="ug"
                type="radio"
                value="ug"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="ug">UG</label>
            </div>
            <div className="cat">
              <input
                name="cat"
                id="uner"
                type="radio"
                value="uner"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="uner">UNER</label>
            </div>
            <div className="cat">
              <input
                name="cat"
                id="uds"
                type="radio"
                value="uds"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="uds">UDS</label>
            </div>
            <div className="cat">
              <input
                name="cat"
                id="ucc"
                type="radio"
                value="ucc"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="ucc">UCC</label>
            </div>
            <div className="cat">
              <input
                name="cat"
                id="umat"
                type="radio"
                value="umat"
                disabled={!publish}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="umat">UMat</label>
            </div>
            <div className="cat">
              <input
                name="cat"
                id="uew"
                type="radio"
                value="uew"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="uew">UCC</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
