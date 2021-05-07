import React from 'react'
import {login} from '../actions/user'
import {showMessage} from '../utils/showMessage'
import {useDispatch} from 'react-redux'
import { setUser } from '../reducers/userReducer'

export const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const dispatch = useDispatch()
    
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const res = await login(email, password)

        if(res.type === 'error'){
            showMessage(res.message, res.type)
        }

        if(res.type === 'success'){
            showMessage('Ви успішно авторизувались', res.type)
            dispatch(setUser(res.user))
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="col s4 offset-s4">
            <h3>Войти</h3>
            <div className="row">
                <div className="input-field col s12">
                    <input 
                        id="email" 
                        type="email" 
                        className="validate" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input 
                        id="password" 
                        type="password" 
                        className="validate"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Пароль</label>
                </div>
            </div>
            <button className="btn waves-effect brown darken-1" type="submit" name="action">Войти</button>
        </form>
    )
}