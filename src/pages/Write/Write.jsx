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
  const [file, setFile] = useState(null);
  const [cat, setCategory] = useState(state?.cat || "");
  const navigate = useNavigate();
  const [status, setStatus] = useState("Publish");
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Publishing...");
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `https://campus-backend.onrender.com/api/posts//posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
            }
          )
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      setStatus("Published 😉");
      navigate("/");
    } catch (err) {
      setStatus("Couldn't publish...");
      console.log(err);
    }
  };
  return (
    <div className="write_container-main">
      {/* <h1 style={{ marginLeft: " 0 0 0 4rem" }}>EDIT:</h1> */}
      <div className="write_container">
        <div className="write_container-left">
          <input
            type="text"
            placeholder="Title..."
            value={title}
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
              style={{ display: "none" }}
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file" className="file">
              Upload image...
            </label>
            <div className="buttons">
              <button onClick={handleSubmit}>{status}</button>
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
