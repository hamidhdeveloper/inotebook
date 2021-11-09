const express = require("express");
const sessionuser = require("../middleware/sessionuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route:1 GET the All Notes Using : GET "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes",sessionuser, async(req, res) => {
  try {
    const notes = await Note.find({user:req.user.id});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send("Internal Server Error");
  }
});

// Route:2 ADD A NEW Note Using : POST "/api/notes/addnote"  login required
router.post("/addnote",sessionuser,[
  body("title", "Enter a Valid Title").isLength({ min: 3 }),
  body("description", "Enter a Valid Description Min Length 5").isLength({
    min: 5,
  }),
], async(req, res) => {
    const {title,description,tag} = req.body;
    // validation check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const note = new Note({
      title,description,tag,user:req.user.id
    })
    const savenote = await note.save();
    res.json(savenote);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send("Internal Server Error");
  }
});

// Route:3 Update a note Using : POST "/api/notes/updatenote"  login required
router.put("/updatenote/:id",sessionuser, async(req, res) => {
  try {
       const {title , description,tag} = req.body;
      //  Create a new note object
      const newNote = {};
      if(title){newNote.title=title};
      if(description){newNote.description=description};
      if(tag){newNote.tag=tag};
      // find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if(!note){
        return res.status(400).send("Not found");
      }
      // verfiy user have same user of the note
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
      res.json(note);


  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send("Internal Server Error");
  }
});

module.exports = router;
