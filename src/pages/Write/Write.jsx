import React, { useEffect, useState } from "react";
import "./Write.scss";
// import { Editor, EditorState } from "draft-js";
import RichEditor from "./RichText";

const Write = () => {
  return (
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
            <b>Status:</b>Draft
          </p>
          <p>
            <b>Visibilty:</b>Public
          </p>

          <input type="file" />
        </div>
        <div className="write_categories"></div>
      </div>
    </div>
  );
};

export default Write;
