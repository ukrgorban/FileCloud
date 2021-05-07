const Route = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')
const User = require('../models/User')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

const route = new Route()

route.post('/', authMiddleware, async (req, res) => {
    try {
        const {name, type, parent} = req.body
        const file = new File({name, type, parent, user: req.user.id})
        const parentFile = await File.findOne({_id: parent})
        if(!parentFile) {
            file.path = name
            await fileService.createDir(file)
        } else {
            file.path = `${parentFile.path}/${file.name}`
            await fileService.createDir(file)
            parentFile.childs.push(file._id)
            await parentFile.save()
        }
        await file.save()
        return res.json(file)
    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
})

route.get('/', authMiddleware, async (req, res) => {
    try {
        const {sort} = req.query
        const files = await File.find({user: req.user.id, parent: req.query.parent}).sort({[sort] : 1})
        return res.json(files)
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get files"})
    }
})


route.get('/search', authMiddleware, async (req, res) => {
    try {
        const {search} = req.query

        const files = await File.find({user: req.user.id})

        const filesSearch = files.filter(file => file.name.includes(search))

        return res.json(filesSearch)
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get files"})
    }
})

route.post('/upload', authMiddleware, async (req, res) => {
    try {

        const file = req.files.file

        const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
        const user = await User.findOne({_id: req.user.id})

        if (user.usedSpace + file.size > user.diskSpace) {
            return res.status(400).json({message: 'There no space on the disk'})
        }

        user.usedSpace = user.usedSpace + file.size

        let fullPath;
        if (parent) {
            fullPath = path.join(
                path.resolve(),
                'files',
                user._id.toString(),
                parent.path.toString(),
                file.name.toString()
            )
        } else {
            fullPath = path.join(
              path.resolve(),
              'files',
              user._id.toString(),
              file.name.toString()
            )
        }

        if (fs.existsSync(fullPath)) {
            return res.status(400).json({message: 'File already exist'})
        }

        file.mv(fullPath)

        const type = file.name.split('.').pop()
        const dbFile = new File({
            name: file.name,
            type,
            size: file.size,
            path: fullPath,
            parent: parent ? parent._id : null,
            user: user._id
        })

        await dbFile.save()
        await user.save()

        res.json(dbFile)

    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "upload error"})
    }
})

route.get('/download', authMiddleware, async (req, res) => {
    try {
        const file = await File.findOne({_id: req.query.id, user: req.user.id})

        const fullPath = path.join(
          path.resolve(),
          'files',
          req.user.id.toString(),
          file.path.toString(),
          file.name.toString()
        )

        if (fs.existsSync(file.path)) {
            return res.download(file.path, file.name)
        }
        // console.log(fullPath, file);
        return res.status(400).json({message: "Download error", fullPath, file})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Download error"})
    }
})

route.delete('/delete', authMiddleware, async (req, res) => {
    try {

        const file = await File.findOne({_id: req.query.id, user: req.user.id})

        if(!file){
            return res.status(400).json({message: "Файл не найден"})
        }

        let fullPath;

        if(file.type !== 'dir'){
            fullPath = file.path
        }else{
            fullPath = path.join(
              path.resolve(),
              'files',
              req.user.id.toString(),
              file.path.toString()
            )
        }

        fse.removeSync(fullPath)

        // todo сделать рекурсивное удаление записей с БД

        const childrenIds = await fileService.getChildrenFiles(file._id)

        if(childrenIds.length){
            for(const childId of childrenIds){
                const childFile = await File.findOne({_id: childId})
                await childFile.remove()
            }
        }

        return res.status(200).json({message: 'Удаление произошло успешно', fullPath})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Download error"})
    }
})

module.exports = route