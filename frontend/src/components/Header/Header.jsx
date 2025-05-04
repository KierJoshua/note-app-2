import React from 'react'
import { LuPencil } from "react-icons/lu";
import { HiOutlinePencilAlt } from "react-icons/hi";

const Header = ({handleToggle, searchHandler}) => {

  const handleSearch = (e)=>{
    searchHandler(e.target.value)
  }

  return (
    <div className="navbar bg-base-100 drop-shadow-md fixed">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">Note App <LuPencil /></a>
    </div>
    <div className="flex gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" onChange={handleSearch}/>
      </div>
      <div className="dropdown dropdown-end">
        <div role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 flex items-center">
            <button onClick={handleToggle} className='cursor-pointer'><h1 className='text-4xl'><HiOutlinePencilAlt /></h1></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header