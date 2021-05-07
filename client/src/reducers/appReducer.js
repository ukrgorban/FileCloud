const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const defaultState = {
    load: false
}

const appReducer = (state = defaultState, action) => {
    switch(action.type){
        case SHOW_LOADER: return {...state, load: true}
        case HIDE_LOADER: return {...state, load: false}
        default:
            return state
    }
}

export default appReducer

export const showLoader = () => ({type: SHOW_LOADER})
export const hideLoader = () => ({type: HIDE_LOADER})
