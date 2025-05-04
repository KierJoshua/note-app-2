import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NoteMenuItem = ({ title, link }) => {
  return (
<NavLink to={`/${link}`}>
  {({ isActive }) => (
    <li
      className={`group relative px-5 py-2 font-medium cursor-pointer transition-colors duration-300 ${
        isActive ? "text-[#4CC9FE]" : "text-slate-700 hover:text-[#4CC9FE]"
      }`}
    >
      {title}
      <span
        className={`absolute left-0 bottom-0 w-full h-[2px] transition-all duration-300 ${
          isActive ? "bg-[#4CC9FE]" : "bg-black group-hover:bg-[#4CC9FE]"
        }`}
      ></span>
    </li>
  )}
</NavLink>
  )
}

export default NoteMenuItem