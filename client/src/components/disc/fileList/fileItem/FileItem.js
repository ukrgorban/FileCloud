import React from 'react';
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import {useDispatch, useSelector} from "react-redux";
import {deleteFile, pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import GetAppIcon from '@material-ui/icons/GetApp';
import {downloadFile, removeFile} from "../../../../actions/file";
import DeleteIcon from '@material-ui/icons/Delete';
import {sizeFormat} from '../../../../utils/sizeFormat'

const style = {
  folder: {
    color: '#6d4c41',
    fontSize: '60px'
  }
}

const FileItem = props => {
  const {_id, name, date, size, type} = props.file
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.file.currentDir)

  const openDirHandler = () => {

    if(type === 'dir'){
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(_id))
    }

  }

  const removeFileHandler = () => {
    removeFile(_id)
      .then(res => {
        dispatch(deleteFile(props.file))
      })
  }

  return (
    <tr>
      <td className="name">
        {
          type === 'dir' ?
            <div style={{cursor: 'pointer'}}  onClick={openDirHandler}>
              <FolderIcon style={style.folder} />
            </div>
          :
            <InsertDriveFileIcon />
        }
        <span>{name}</span>
      </td>
      <td>{date}</td>
      <td>{sizeFormat(size)}</td>
      <td>
        <div className="panel">
          { type !== 'dir' && <GetAppIcon onClick={() => downloadFile(props.file)} /> }
          <DeleteIcon style={{cursor: 'pointer'}} onClick={removeFileHandler}  />
        </div>
      </td>
    </tr>
  );
};

export default FileItem;