import React from "react";
import NoteMenuItem from "./NoteMenuItem";

const NotesMenu = () => {
  return (
    <div className="max-w-7xl w-full mt-20">
      <h1 className="font-semibold text-2xl">Your Notes</h1>
      <div className="my-5 mx-5 md:mx-0">
        <ul className="flex cursor-pointer">
          <NoteMenuItem title="ALL" link="all" />
          <NoteMenuItem title="PERSONAL" link="personal" />
          <NoteMenuItem title="HOME" link="home" />
          <NoteMenuItem title="BUSINESS" link="business" />
        </ul>
      </div>
    </div>
  );
};

export default NotesMenu;
