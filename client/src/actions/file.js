import axios from 'axios'
import {addDirectory, setFiles} from "../reducers/fileReducer";
import {addUploaderFile, changeUploadFile, hideUploader, showUploader} from "../reducers/uploadReducer";
import {hideLoader, showLoader} from "../reducers/appReducer";
import {API_URL} from "../config";

export const search = search => {
  return async dispatch => {
    try{
      dispatch(showLoader())

      const config = {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}}

      const params = `?search=${search}`

      const response = await axios.get(API_URL + '/api/file/search' + params, config)

      dispatch(setFiles(response.data))

    }catch(e){
      return {type: 'error', message: e.response.data.message}
    }finally {
      dispatch(hideLoader())
    }
  }
}

export const getFiles = (dirId, sort = 'type') => {

  return async dispatch => {
    try{

      dispatch(showLoader())

      const config = {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}}

      let params = `?sort=${sort}`
      params += dirId ? '&parent=' + dirId : ''

      const response = await axios.get(API_URL + '/api/file/' + params, config)

      dispatch(setFiles(response.data))

    }catch(e){

      return {type: 'error', message: e.response.data.message}

    }finally {
      dispatch(hideLoader())
    }
  }

}


export const addDir = async (dirName, parent) => {

  try{

    const body = {name: dirName, type: 'dir', parent}

    const config = {
      headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}
    }

    const response = await axios.post(API_URL + '/api/file/', body, config)

    return response.data

  }catch(e){

    return {type: 'error', message: e.response.data.message}

  }

}

export const addFile = (file, dirId) => {

 return async dispatch => {
   try{

     const formData = new FormData()

     formData.append('file', file)

     if (dirId) {
       formData.append('parent', dirId)
     }

     const uploadFile = {name: file.name, progress: 0, id: file.name + Date.now().toString()}

     dispatch(showUploader())
     dispatch(addUploaderFile(uploadFile))

     const onUploadProgress = progressEvent => {
       const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
       if (totalLength) {
         uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
         dispatch(changeUploadFile(uploadFile))
       }
     }

     const config = {
       headers: {Authorization:`Bearer ${localStorage.getItem('token')}`},
       onUploadProgress
     }


     const response = await axios.post(API_URL + '/api/file/upload', formData, config)


     dispatch(addDirectory(response.data))
     dispatch(hideUploader())

   }catch(e){

     return {type: 'error', message: e.response.data.message}

   }
 }

}

export async function downloadFile(file) {
  const response = await fetch(API_URL + `/api/file/download?id=${file._id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (response.status === 200) {

    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export const removeFile = async (fileID) => {

  try{

    const config = {
      headers: {Authorization:`Bearer ${localStorage.getItem('token')}`},
    }

    const response = await axios.delete(API_URL + '/api/file/delete?id=' + fileID, config)

    return response.data

  }catch(e){

    return {type: 'error', message: e.response.data.message}

  }

}