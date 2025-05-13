import Note from "../models/note.model.js";
import mongoose from "mongoose";

export const getNotes = async(req,res) => {
    try {
        const getNote = await Note.find({});
        res.status(200).json({success:true, data:getNote})
    } catch (error) {
        console.log("error in fetching notes", error.message)
        res.status(500).json({success:false,message:"Server Error"})
    }

}

export const createNote = async(req,res) => {
    const getNote = req.body;
    if(!getNote.type || !getNote.title || !getNote.content){
        return res.status(400).json({success:false,message:"Please provide all fields"})
    }

    const newNote = new Note(getNote)

    try {
        await newNote.save()
        res.status(201).json({success:true,message:"New note added successfully", data:newNote})
    } catch (error) {
        console.error(`error creating note`, error.message)
        res.status(500).json({success:false, message:"Server error"})
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }
  
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      
      if (!deletedNote) {
        return res.status(404).json({ success: false, message: "Note not found" });
      }
  
      res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

export const updateNote = async (req,res) => {
    const {id} = req.params;
    const note = req.body;

      // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid ID");
    return res.status(400).json({ success: false, message: "Invalid Note ID" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(id , note , {new:true})

    if (!updatedNote) {
        console.log("Note not found in DB");
        return res.status(404).json({ success: false, message: "Note not found" });
      }
  
      console.log("Successfully updated note:", updatedNote);
      res.status(200).json({
        success:true,
        message:"Note updated successfully!",
        data: updatedNote
      })
  } catch (error) {
    console.error("Update Error:", error.message)
    res.status(500).json({ success: false, message: "Server Error" });
  }
}