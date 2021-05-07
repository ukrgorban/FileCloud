import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../../reducers/userReducer';
import CloudQueueTwoToneIcon from '@material-ui/icons/CloudQueueTwoTone';
import Search from "../search/Search";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    const logoutHandler = () => {
      dispatch(logout())
      localStorage.removeItem('token')
    }

    return(
        <nav>
            <div className="nav-wrapper brown darken-1">
                <div className="brand-logo">
                  <NavLink to="/">
                    <span>FileCloud</span>
                    <CloudQueueTwoToneIcon style={{fontSize: '50px'}} />
                  </NavLink>
                </div>
                {isAuth && <Search />}
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {!isAuth && <li><NavLink to="/login">Войти</NavLink></li>}
                    {!isAuth && <li><NavLink to="/registration">Регистрация</NavLink></li>}
                    {isAuth && <li className="logout" onClick={logoutHandler}>Выйти</li>}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar