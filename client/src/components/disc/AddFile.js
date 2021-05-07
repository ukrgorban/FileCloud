import React from 'react';
import {addFile} from "../../actions/file";
import {useDispatch, useSelector} from "react-redux";

const AddFile = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.file.currentDir)

  const fileUploadHandler = e => {
    const files = [...e.target.files]

    files.forEach(file => dispatch(addFile(file, currentDir)))

  }

  return (
    <div className="file-field input-field" style={{margin: 0}}>
      <div className="btn light-blue accent-3" style={{height: '36px', lineHeight: '36px'}}>
        <span>Добавить файл</span>
        <input onChange={fileUploadHandler} type="file" multiple />
      </div>
      <div className="file-path-wrapper" style={{display: 'none'}}>
        <input className="file-path validate" type="text" />
      </div>
    </div>
  );
};

export default AddFile;