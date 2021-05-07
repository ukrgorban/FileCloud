import React from 'react';
import UploaderItem from "./upoaderItem/UploaderItem";
import "./uploader.css"
import {useSelector} from "react-redux";

const Uploader = () => {
  const files = useSelector(state => state.upload.files)

  return (
    <div className="uploader-wrap">

      {files.map(file => <UploaderItem key={file.id} file={file} />)}

    </div>
  );
};

export default Uploader;