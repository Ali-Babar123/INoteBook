const express = require('express')
// we have a router in express
const router = express.Router();
// we have a express validator 
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');


// route 01 fetch all notes using GET : /api/auth/fecthNotes
router.get('/fetchNotes',fetchuser, async(req, res)=>{
   try {
      const notes = await Notes.find({user: req.user.id});
      res.json(notes);
      
   } catch (error) {
      console.error(error.message);
      return res.send(401).json({error: "Some error occured"});
   }
})
// Router 02 to add notes using Post : /api/auth/fecthNotes
router.post('/addNotes',fetchuser,[
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description' , 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async(req, res)=>{
   try {
      
   const {title, description, tag} = req.body;
   // if there are errors, return bad request and errors 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const notes = new Notes({
      title, description, tag, user: req.user.id
   });
   const savedNotes = await notes.save();
   res.json(savedNotes);

}catch (error) {
      console.error(error.message);
      return res.send(401).json({error: "Some error occured"});
   }
})

  

   // Router 03 to update existing Notes using put : /api/auth/fetchNotes
router.put('/Updatenotes/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body;

   // Create a new node for update
   const newNode = {};
   if (title) { newNode.title = title; }
   if (description) { newNode.description = description; }
   if (tag) { newNode.tag = tag; }

   try {
       // Find the note to update and check if it exists
       let note = await Notes.findById(req.params.id);
       if (!note) {
           return res.status(404).send("Note not found");
       }

       // Check if the user is authorized to update this note
       if (note.user.toString() !== req.user.id) {
           return res.status(401).send("Not allowed");
       }

       // Update the note and return the updated note
       note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNode }, { new: true });
       res.json({ note });
   } catch (error) {
       console.error(error.message);
       res.status(500).send("Server Error");
   }
});
// Router 04 to update existing Notes using delete : /api/auth/fetchNotes
router.delete('/Deletenotes/:id', fetchuser, async (req, res) => {
   

   // Create a new node for update
   // const newNode = {};
   // if (title) { newNode.title = title; }
   // if (description) { newNode.description = description; }
   // if (tag) { newNode.tag = tag; }

   try {
       // Find the note to delete and delete if it exists
       let note = await Notes.findById(req.params.id);
       if (!note) {
           return res.status(404).send("Note not found");
       }

       // Check if the user is authorized to update this note
       if (note.user.toString() !== req.user.id) {
           return res.status(401).send("Not allowed");
       }

       // Update the note and return the updated note
       note = await Notes.findByIdAndDelete(req.params.id);
       res.json({ "Success": "Note has been deleted", note: note });
   } catch (error) {
       console.error(error.message);
       res.status(500).send("Server Error");
   }
});


module.exports = router