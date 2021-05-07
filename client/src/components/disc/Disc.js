import React, {useEffect} from 'react';
import './disc.css'
import FileList from "./fileList/FileList";
import {getFiles} from "../../actions/file";
import {setCurrentDir} from "../../reducers/fileReducer";
import {useDispatch, useSelector} from "react-redux";
import AddDir from "./AddDir";
import AddFile from "./AddFile";
import AddFileDragNDrop from "./AddFileDragNDrop";
import Loader from "../Loader";


const Disc = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.file.currentDir)
  const load = useSelector(state => state.app.load)
  const dirStack = useSelector(state => state.file.dirStack)

  useEffect(() => {

    dispatch(getFiles(currentDir))

  }, [currentDir, dispatch])

  const back = () => {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  return (
    <div className="container">
      <div className="btn-panel">
        <AddDir />
        <AddFile />
        <button
          onClick={back}
          className="btn back brown darken-1"
        >Назад</button>
      </div>
      <AddFileDragNDrop />
      {
        load
          ?
          <Loader />
          :
          <FileList />
      }

    </div>
  );
};

export default Disc;