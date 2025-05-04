import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";
import dayjs from 'dayjs';
import { useNoteStore } from '../../contexts/store/note.store';

const Personal = () => {
  const filteredNotes = useOutletContext();
    const deleteNote = useNoteStore((state) => state.deleteNote)
    const openEditNote = useNoteStore((state) => state.openEditNote)

  return (
    <div className="grid grid-cols-12 gap-3 w-full max-w-7xl">
    <div className="col-span-12">
      <h1 className="text-3xl font-bold text-center">Personal</h1>
    </div>
    {filteredNotes.length > 0 ? (
      filteredNotes
        .filter((note) => note.type === "Personal")
        .map((note, key) => (
          <div className="col-span-12 sm:col-span-6 md:col-span-4" key={key}>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-5">
              <div className="flex items-center mb-3">
                <h2
                  className={`rounded-lg p-2 font-semibold mr-auto ${
                    note.type === "Personal"
                      ? "bg-[#50B498]"
                      : note.type === "Home"
                      ? "bg-[#9CDBA6]"
                      : "bg-[#DEF9C4]"
                  }`}
                >
                  {dayjs(
                    note.updatedAt !== note.createdAt
                      ? note.updatedAt
                      : note.createdAt
                  ).format("MMMM D, YYYY")}
                </h2>
                <div className="flex justify-end space-x-1">
                  <button
                    className="text-gray-600 cursor-pointer px-2 py-1 transform transition-transform duration-200 hover:scale-110"
                    onClick={() => deleteNote(note._id)}
                  >
                    <h3 className="text-2xl">
                      <RiDeleteBack2Line />
                    </h3>
                  </button>
                  <button
                    className="text-gray-600 cursor-pointer px-2 py-1 transform transition-transform duration-200 hover:scale-110"
                    onClick={() => openEditNote(note)}
                  >
                    <h3 className="text-2xl">
                      <MdOutlineEdit />
                    </h3>
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-3">{note.title}</h2>
              <p className="text-gray-600">{note.content}</p>
            </div>
          </div>
        ))
    ) : (
      <div className="col-span-12">
        <h1 className="text-3xl font-bold text-center">No Notes Found</h1>
      </div>
    )}
  </div>
  )
}

export default Personal