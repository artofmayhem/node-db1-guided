const db = require("../../data/db-config.js")

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get() {
  return db("posts") //select * from posts
  //return db("posts").select("contents")
}

function getById(id) {
  //select * from posts where recordid = userGivenId
  return db("posts").where("id",id)
}

function create() {
  return Promise.resolve('create wired')
}

function update() {
  return Promise.resolve('update wired')
}

function remove() {
  return Promise.resolve('delete wired')
}
