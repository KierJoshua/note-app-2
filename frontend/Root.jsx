import React, { useEffect, useState } from 'react'
import Header from './src/components/Header/Header'
import NotesMenu from './src/components/Notesmenu/NotesMenu'
import { Outlet } from 'react-router-dom'
import { useNoteStore } from './src/contexts/store/note.store'
import AddNote from './src/components/AddNote'
import dayjs from 'dayjs'
import EditNote from './src/components/EditNote'

const NRoot = () => {
  const currentDate = dayjs().format("MMMM D, YYYY");

  const fetchNotes = useNoteStore((state) => state.fetchNotes);
  const notes = useNoteStore((state) => state.notes);

  const [newNoteData, setNewNoteData] = useState(notes);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [toggleAddNote, setToggleAddNote] = useState(false);

  const handleToggle = () => {
    console.log("Toggle clicked");
    setToggleAddNote(!toggleAddNote);
  }

  
  const searchHandler = ((query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = newNoteData.filter((notes) =>
      Object.values(notes).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
    setFilteredNotes(filtered);
  })

  useEffect(() => {
    setNewNoteData(notes);
  }, [notes]);

  useEffect(() => {
    setFilteredNotes(newNoteData);
  }, [newNoteData]);

  useEffect(() =>{
    fetchNotes()
  },[fetchNotes])

  return (
    <div className='flex flex-col items-center bg-slate-200 min-h-screen'>
        <Header handleToggle={handleToggle} searchHandler={searchHandler}/>
        <EditNote currentDat={currentDate}/>
        <NotesMenu />
        {toggleAddNote && <AddNote currentDate={currentDate} setToggleAddNote={setToggleAddNote}/>}
        <Outlet context={filteredNotes}/>
    </div>
  )
}

export default NRoot