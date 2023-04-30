// NOTE ENDPOINT TO PERFORM CRUD OPERATION

const express = require("express");
const router = express.Router();
const fetchuser = require('../Moddleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');

// __________________________________________________________________________________________

// Route 1 ENDPOINT : Get all the notes using GET Method "api/notes/fetchallnotes"::Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured in fetching notes");
    }
});

// _________________________________________________________________________________________________


// Route 2 :Adding a new notes using POST Methid "api/notes/addnotes" ::Login required

router.post('/addnotes', fetchuser, [
    body('title', "Enter a Valid Title to add notes ").isLength({ min:5}),
    body('description', 'Enter a valid Description to add notes').isLength({ min:5}),
    body('tag', 'Enter a Tag to add note ').isLength({ min:4}),  
], async (req, res) => {
    try {
        // destructering
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occured in server note");
    }
});

// ___________________________________________________________________________________________________

// Route 3 ENDPOINT :Updating a Existing  Notes using POST Method "api/auth/updatenote" :Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag}=req.body;
    try {
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the notes to be updated and update it 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}

    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
}
})
// _________________________________________________________________________________________________________

// Route 4 :Deleting a existing  notes using DELETE Method "api/notes/deletenote":Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
    // find the notes to be updated and update it 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({Success : "Note has been deleted", note:note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
});
// ____________________________________________________________________________________________________________


module.exports = router

