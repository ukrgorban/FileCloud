import React from 'react'
import {registration} from '../actions/user'
import {showMessage} from '../utils/showMessage'

export const Registration = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const res = await registration(email, password)

        showMessage(res.message, res.type)
        
        if(res.type === 'success'){
            setEmail('')
            setPassword('') 
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="col s4 offset-s4">
            <h3>Регистрация</h3>
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
            <button className="btn waves-effect brown darken-1" type="submit" name="action">Зарегистрироваться</button>
        </form>
    )
}