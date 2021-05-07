import React from 'react';
import './disc.css'
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";

const Sort = () => {
  const selectRef = React.useRef()
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.file.currentDir)

  React.useEffect(() => {
    window.M.FormSelect.init(selectRef.current);
  }, [])

  const onChangeSelectHandler = e => {
    dispatch(getFiles(currentDir, e.target.value))
  }


  return (
    <div className="input-field offset-m10 col s2 sort">
      <select
        ref={selectRef}
        onChange={onChangeSelectHandler}
      >
        <option value="type">Типу</option>
        <option value="name">Названию</option>
        <option value="date">Дате</option>
        <option value="size">Размеру</option>
      </select>
      <label>Сортировать:</label>
    </div>
  );
};

export default Sort;