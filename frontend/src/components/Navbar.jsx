import React from "react";
import {FaRegWindowClose} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import{SiGooglehome, SiAtlassian, SiMaildotcom} from "react-icons/si";
import {BsCollectionFill} from "react-icons/bs";


export default function Navbar({containerStyles, toggleMenu, menuOpened}) {
  
  const navItems = [
    {to: '/', label:"Home", icon:<SiGooglehome />},
    {to: '/collection', label:"Collection", icon:<BsCollectionFill/>},
    {to: '/about', label:"About", icon:<SiAtlassian/>},
    {to: '/mailto:support@shoplio.com', label:"Contact", icon:<SiMaildotcom/>},
  ]
  
  return (
  <nav className={containerStyles}>
    {menuOpened && (
      <>
          <FaRegWindowClose
          onClick = {toggleMenu}
          className='text-xl self-end cursor-pointer relative left-8 text-secondary'
          />
          <Link to={'/'} className="bold-24 mb-10">
          <h4 className=' text-secondary'>Shoplio</h4>
          </Link>
      </>
    )}
    {navItems.map(({to,label,icon})=>(
      <div key={label} className="inline-flex">
        <NavLink to={to} className={({isActive})=>isActive ?
        "active-link flexCenter gap-x-2" : "flexCenter gap-x-2"}
        onClick={menuOpened && toggleMenu}
        >
          {icon}
          <h5 className="medium-16">{label}</h5>
        </NavLink>
      </div>
    ))}
   </nav>
  )
}
