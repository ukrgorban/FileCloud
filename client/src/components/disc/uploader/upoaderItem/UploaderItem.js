import React from 'react';
import './uploaderItem.css'

const UploaderItem = ({file}) => {


  return (
    <div className="uploader-item-wrap">
      <div className="upload-header">
        <div className="title">{file.name}</div>
        {/*<div className="close"><HighlightOffIcon onClick={() => dispatch(removeUploaderFile(file.id))} /></div>*/}
      </div>
      <div className="progress">
        <div className="determinate" style={{width: file.progress + '%'}}></div>
      </div>
    </div>
  );
};

export default UploaderItem;