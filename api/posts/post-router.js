const express = require("express");
const Post = require("./post-model");

const router = express.Router();

//database using Knex
const db = require("../../data/db-config");

function checkId(req, res, next) {
  next();
}

function checkPayload(req, res, next) {
  next();
}

router.get("/", async (req, res, next) => {
  //DAVID GUIDED EXAMPLE
  // try {
  //   const data = await Post.get()
  //   res.json(data)
  // } catch (err) {
  //   next(err)
  // }
  // DAN FREHNER METHOD
  //SELECT * FROM posts
  db.select("*")
    .from("posts")
    .then((postsArray) => {
      res.status(200).json({
        data: postsArray,
      });
    })
    .catch((err) => {
      console.log({ err });
    });
});

router.get("/:id", checkId,  (req, res) => {
  //DAVID LECTURE
  // try {
  //   const data = await Post.getById();
  //   res.json(data);
  // } catch (err) {
  //   next(err);
  // }
  //DAN LECTURE
  //GET *from posts WHERE ID = id
  const {id} = req.params;
  db('posts') // short hand same as "*"
  //.where("id", "=", id)  //or
  //.where({ id : id })    //or
  //.where({id})           //or
  .where("id", id)         // all three are correct with the bottom two being preferable
  .first()
  .then((post) => {
    res.status(200).json({ data: post })
  })
  .catch((err) => {
    console.log({ err });
  });

});

router.post("/", checkPayload, async (req, res, next) => {
  //DAVID METHOD
  // try {
  //   const data = await Post.create();
  //   res.json(data);
  // } catch (err) {
  //   next(err);
  // }
  //DAN METHOD
  //INSERT INTO Posts (fields... ) Values (values...)
  const postData = req.body;
  db("posts")
  .insert(postData)
  .then((id) => 
  res.status(201).json({data: id}))
  .catch((err) => {
    console.log({ err });
  });

});

router.put("/:id", checkPayload, checkId, async (req, res, next) => {
  //DAVE METHOD
  // try {
  //   const data = await Post.update();
  //   res.json(data);
  // } catch (err) {
  //   next(err);
  // }
  //DAN Method
  const { id } = req.body;
  const changes = req.body;
  // UPDATE posts SET field = new value where id = id;
  db("posts")
  .where("id", id) //DON'T YOU FORGET ABOUT ME.... NO NO NO NOOOOOO...
  .update(changes)
  .then((count) => {
    if(count > 0) {
      res.status(200).json({ data: count })
    } else {
      res.status(404).json({ message: 'there was no record to delete'})
    }
  })
  .catch((err) => {
    console.log({ err });
  });

});

router.delete("/:id", checkId, async (req, res, next) => {
  //DAVE Method
  // try {
  //   const data = await Post.remove();
  //   res.json(data);
  // } catch (err) {
  //   next(err);
  // }
  //Dan Method
  const { id } = req.params;
  db("posts")
  .where("id", id)
  .delete()
  .then((count) => {
    if(count > 0) {
      res.status(200).json({ data: count })
    } else {
      res.status(404).json({ message: 'there was no record to delete'})
    }
  })
  .catch((err) => {
    console.log({ err });
  });

});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
