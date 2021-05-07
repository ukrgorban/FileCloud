import React from 'react';
import './search.css'
import {search} from "../../actions/file";
import {useDispatch} from "react-redux";

const Search = () => {
  const dispatch = useDispatch()
  const timerIdRef = React.useRef()

  const onChangeHandler = e => {
    clearTimeout(timerIdRef.current)

    timerIdRef.current = setTimeout(() => {
      dispatch(search(e.target.value))
    }, 500)

  }

  return (
    <div className="search">
      <input
        className="search_input"
        placeholder="Поиск"
        type="text"
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default Search;