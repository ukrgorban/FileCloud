const SHOW_UPLOADER = 'SHOW_UPLOADER'
const HIDE_UPLOADER = 'HIDE_UPLOADER'
const ADD_UPLOADER_FILE = 'ADD_UPLOADER_FILE'
const REMOVE_UPLOADER_FILE = 'REMOVE_UPLOADER_FILE'
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE'

const defaultState = {
  isVisible: false,
  files: []
}

const uploadReducer = (state = defaultState, action) => {
  switch(action.type){
    case SHOW_UPLOADER: return {...state, isVisible: true}
    case HIDE_UPLOADER: return {...state, isVisible: false, files: []}
    case ADD_UPLOADER_FILE:
      return {...state, files: [...state.files, action.payload]}
    case REMOVE_UPLOADER_FILE:
      return {...state, files: [...state.files.filter(file => file.id !== action.payload)]}
    case CHANGE_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files.map(file => file.id === action.payload.id
          ? {...file, progress: action.payload.progress}
          : {...file}
        )]
      }
    default:
      return state
  }
}

export default uploadReducer

export const showUploader = dir => ({type: SHOW_UPLOADER, payload: dir})
export const hideUploader = () => ({type: HIDE_UPLOADER})
export const addUploaderFile = file => ({type: ADD_UPLOADER_FILE, payload: file})
export const removeUploaderFile = fileId => ({type: REMOVE_UPLOADER_FILE, payload: fileId})
export const changeUploadFile = payload => ({type: CHANGE_UPLOAD_FILE, payload: payload})