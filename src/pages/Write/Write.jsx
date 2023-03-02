import React from "react";
import "./Write.scss";
import RichEditor from "./RichText";

const Write = () => {
  return (
    <div className="write_container-main">
      {/* <h1 style={{ marginLeft: " 0 0 0 4rem" }}>EDIT:</h1> */}
      <div className="write_container">
        <div className="write_container-left">
          <input type="text" placeholder="Title..." />
          <div className="editor">
            <RichEditor />
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
            />
            <label htmlFor="file" className="file">
              Upload image...
            </label>
            <div className="buttons">
              <button>Publish</button>
              <button>Save as Draft</button>
            </div>
          </div>
          <br />
          <div className="write_categories">
            <h2>Categories</h2>
            <div className="cat">
              <input name="cat" id="knust" type="radio" value="knust" />
              <label htmlFor="knust">KNUST</label>
            </div>
            <div className="cat">
              <input name="cat" id="ug" type="radio" value="ug" />
              <label htmlFor="ug">UG</label>
            </div>
            <div className="cat">
              <input name="cat" id="uner" type="radio" value="uner" />
              <label htmlFor="uner">UNER</label>
            </div>
            <div className="cat">
              <input name="cat" id="uds" type="radio" value="uds" />
              <label htmlFor="uds">UDS</label>
            </div>
            <div className="cat">
              <input name="cat" id="ucc" type="radio" value="ucc" />
              <label htmlFor="ucc">UCC</label>
            </div>
            <div className="cat">
              <input name="cat" id="umat" type="radio" value="umat" />
              <label htmlFor="umat">UMat</label>
            </div>
            <div className="cat">
              <input name="cat" id="uew" type="radio" value="uew" />
              <label htmlFor="uew">UCC</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
