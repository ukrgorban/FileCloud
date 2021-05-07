import React from 'react';
import FileItem from "./fileItem/FileItem";
import {useSelector} from "react-redux";
import Sort from "../Sort";

const FileList = () => {
  const files = useSelector(state => state.file.files)

  const fileResult = files.map(file => <FileItem key={file._id} file={file} />)

  if(!fileResult.length){
    return (
      <div>
        Пусто
      </div>
    );
  }

  return (
    <>
      <Sort />
      <table className="striped">
        <thead>
        <tr>
          <th>Название</th>
          <th>Дата</th>
          <th>Размер</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {fileResult}
        </tbody>
      </table>
    </>
  );
};

export default FileList;