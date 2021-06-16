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
  return db("posts").where("id",id).first()
}

function create({title, contents}) {
  const [id] = await db("posts").insert({title,contents})
  return 
}

function update() {
  return Promise.resolve('update wired')
}

function remove() {
  return Promise.resolve('delete wired')
}
