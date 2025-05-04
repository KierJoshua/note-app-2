import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useNoteStore } from '../contexts/store/note.store';
import Swal from 'sweetalert2';

const EditNote = ({currentDate}) => {
    const selectedNote = useNoteStore(state => state.selectedNote);
    const editNote = useNoteStore(state => state.editNote);

    const [editNoteData, setEditNoteData] = useState({
        title: "",
        type: "Type",
        content : "",
        date: currentDate,
      });
    
      useEffect (() => {
        if(selectedNote){
            setEditNoteData({
                    title: selectedNote.title,
                    type: selectedNote.type,
                    content : selectedNote.content,
                    date: currentDate,
                  })
            }
      },[selectedNote])
    
      const setNoteType = (type) => {
        setEditNoteData((prev) => ({ ...prev, type }));
      };
    
      const handleInputChange = (e) => {
        const {name,value} = e.target;
        setEditNoteData((prev) => ({...prev,[name] : value}));
      }
    
      const handleSaveNote = async(id,editNoteData) => {
       const {success,message} = await editNote(id,editNoteData);
              if(!success){
                 Swal.fire({
                   position: "top-end",
                   icon: "error",
                   title: message,
                   showConfirmButton: false,
                   timer: 1500
                 });
               }else{
                 Swal.fire({
                   position: "top-end",
                   icon: "success",
                   title: message,
                   showConfirmButton: false,
                   timer: 1500
                 });
               }
        const modal = document.getElementById("my_modal_1");
        modal && modal.close();
      };
  return (
    <>
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-slate-200">
      <form method="dialog">
    {/* if there is a button in form, it will close the modal */}
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
  </form>
        <div className="flex justify-center items-center w-full mt-3">
          <div className="grid grid-cols-12 gap-3 my-3 w-full max-w-md">
          <h1 className="col-span-12 text-end text-xl font-semibold">{editNoteData.date}</h1>
            <input
              type="text"
              className="input col-span-12 sm:col-span-8"
              placeholder="Title"
              name="title"
              value={editNoteData.title}
              onChange={handleInputChange}
            />
            <details className="dropdown col-span-12 sm:col-span-4">
              <summary className="btn w-full">{editNoteData.type}</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow w-full" onChange={handleInputChange} value={editNoteData.type}>
                <li onClick={() => setNoteType("Personal")}>
                  <a>Personal</a>
                </li>
                <li onClick={() => setNoteType("Home")}>
                  <a>Home</a>
                </li>
                <li onClick={() => setNoteType("Business")}>
                  <a>Business</a>
                </li>
              </ul>
            </details>
            <textarea
              className="textarea col-span-12 w-full"
              placeholder="Start writing"
              name="content"
              value={editNoteData.content}
              onChange={handleInputChange}
            ></textarea>
            <button className="btn col-span-12" onClick={() => handleSaveNote(selectedNote._id, editNoteData)}>Save Note</button>
          </div>
        </div>
      </div>
    </dialog>
  </>
  )
}

export default EditNote