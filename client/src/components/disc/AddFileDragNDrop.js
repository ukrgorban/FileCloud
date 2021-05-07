import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFile} from "../../actions/file";
import Uploader from "./uploader/Uploader";

const AddFileDragNDrop = () => {
  const [dragEnter, setDragEnter] = React.useState(false)
  const isVisible = useSelector(state => state.upload.isVisible)
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.file.currentDir)

  const onDragEnterHandler = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragEnter(true)
  }
  const onDragLeaveHandler = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragEnter(false)
  }
  const onDragOverHandler = e => {
    e.preventDefault()
    e.stopPropagation()

    const files = [...e.dataTransfer.files]

    files.forEach(file => {
      dispatch(addFile(file, currentDir))
      setDragEnter(false)
    })

  }

  return (
    <div className={!dragEnter ? 'drag-zone' : 'drag-zone active'}>
      {!dragEnter
          ?
            <div className="darg-zone-wrap"
              onDragEnter={onDragEnterHandler}
              onDragLeave={onDragLeaveHandler}
              onDragOver={onDragEnterHandler}
            >
              {
                isVisible
                  ?
                  <Uploader />
                  :
                  <span>Перетащите сюда файлы</span>
              }

            </div>

          :
            <div
              className="darg-zone-wrap"
              onDrop={onDragOverHandler}
              onDragEnter={onDragEnterHandler}
              onDragLeave={onDragLeaveHandler}
              onDragOver={onDragEnterHandler}
            >
              Отпустите файлы
            </div>
      }
    </div>
  );
};

export default AddFileDragNDrop;