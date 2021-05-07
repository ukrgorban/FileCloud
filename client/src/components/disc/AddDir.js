import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addDirectory} from "../../reducers/fileReducer";
import {addDir} from "../../actions/file";

const AddDir = () => {
  const [dirName, setDirName] = React.useState('')
  const modalRef = React.useRef()
  const modalObjlRef = React.useRef()
  const currentDir = useSelector(state => state.file.currentDir)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };

    modalObjlRef.current = window.M.Modal.init(modalRef.current, options);

  }, [])

  const onClickHandler = async () => {

    const res = await addDir(dirName, currentDir)
    dispatch(addDirectory(res))

    modalObjlRef.current.close()
    setDirName('')
  }

  return (
    <div className="modal-wrap">
      <button data-target="modal" className="btn modal-trigger">Добавить папку</button>
      <div ref={modalRef} id="modal" className="modal">
        <div className="modal-content">
          <h4>Добавить папку</h4>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="dirName"
                type="text"
                value={dirName}
                onChange={e => setDirName(e.target.value)}
              />
              <label htmlFor="dirName">Название</label>
            </div>


          </div>
        </div>
        <div className="modal-footer">
          <button
            className="waves-effect waves-green btn-flat"
            onClick={ () => modalObjlRef.current.close() }
          >Отмена</button>
          <button
            className="waves-effect waves-green btn-flat"
            onClick={onClickHandler}
          >Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default AddDir;