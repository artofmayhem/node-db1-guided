const express = require('express')
const Post = require('./post-model')

const router = express.Router()

async function checkId(req, res, next) {
  try{
    const post = await Post.getById(req.params.id)
    if(post){
      req.post = post
      next()
    }else{
      res.staus(404).json("Post not found")
    }
  }catch(err){
    next(err)
  }
}

function checkPayload(req, res, next) {
  const {title, contents} = req.body
  if(title && contents){
    next()
  }else{
    res.status(400).json("title and contents required")
  }
}

router.get('/', async (req, res, next) => {
  try {
    const data = await Post.get()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkId, async (req, res) => {
  res.status(200).json(req.post)
})

router.post('/', checkPayload, async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body)
    res.status(201).json(newPost)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkPayload, checkId, async (req, res,next ) => {
  try {
    const updatedPost = await Post.update(req.params.id, req.body)
    res.json(updatedPost)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkId, async (req, res, next) => {
  try {
    const data = await Post.remove()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router
