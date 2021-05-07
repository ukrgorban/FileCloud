import axios from 'axios'
import {logout, setUser} from "../reducers/userReducer";
import {hideLoader, showLoader} from "../reducers/appReducer";
import {API_URL} from "../config";

export const registration = async (email, password) => {
    try{
        const response = await axios.post(
            API_URL + '/api/auth/registration',
            {email, password}
        )
        return {type: 'success', message: response.data.message}
    }catch(e){
        return {type: 'error', message: e.response.data.message}
    }
}

export const login = async (email, password) => {
    try{
        const response = await axios.post(
          API_URL + '/api/auth/login',
            {email, password}
        )
        
        localStorage.setItem('token', response.data.token)

        return {type: 'success', user: response.data.user}
    }catch(e){
        return {type: 'error', message: e.response.data.message}
    }
}

export const auth = () => {
    return async dispatch => {
        try {

            dispatch(showLoader())
            const config = {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            const response = await axios.get(API_URL + '/api/auth/auth', config)

            localStorage.setItem('token', response.data.token)

            dispatch(setUser(response.data.user))
        } catch (e) {
            dispatch(logout())
            return {type: 'error', message: e.response.data.message}
        }finally{
            dispatch(hideLoader())
        }
    }
}
