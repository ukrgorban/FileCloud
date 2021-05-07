const fs = require('fs')
const path = require('path')
const File = require('../models/File')

class FileService{

    createDir(file){
        
        const fullPath = path.join(
            path.resolve(), 
            'files', 
            file.user.toString(), 
            file.path.toString()
        )
        
        return new Promise((resolve, reject) => {
            
            try{

                if(!fs.existsSync(fullPath)){
                    fs.mkdirSync(fullPath)
                    resolve({message: 'File was created'})
                }else{
                    reject({message: "File already exist"})
                }

            }catch(e){
                reject({message: 'File error', error: e})
            }

        })
    }

    async getChildrenFiles(id){
        const childrenIds = [id];

        async function getFileId(id){
            const files = await File.find({parent: id})

            if(files.length){
                for(const file of files){
                    childrenIds.push(file._id)
                    await getFileId(file._id)
                }
            }

            return;

        }

        await getFileId(id)

        return childrenIds
    }

}

module.exports = new FileService()