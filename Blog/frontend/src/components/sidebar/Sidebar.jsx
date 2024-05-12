import React from 'react'
import './Sidebar.css'
export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebarItem'>
            <span className='sidebarTitle'>ABOUT US</span>
            <img className='sidebarImage' src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
            <p>
                This is the about section in this section  we can write about us
                the way we want to write about ourself.
            </p>
            <div className='sidebarItem'>
                <span className='sidebarTitle'> CATEGORIES </span>
                <ul className='sidebarList'>
                    <li className='sidebarListItem'>
                        LIFE
                    </li>
                    <li className='sidebarListItem'>
                        SPORTS
                    </li>
                    <li className='sidebarListItem'>
                        MUSIC
                    </li>
                    <li className='sidebarListItem'>
                        STYLE
                    </li>
                    <li className='sidebarListItem'>
                        TECH
                    </li>
                </ul>
            </div>
            <div className='sidebarItem'>
                <span className='sidebarTitle'>Follow Us</span>
                <div className='sidebarSocial'>
                    <i className='sidebarIcon fab fa-facebook-square'></i>
                    <i className='sidebarIcon fab fa-instagram-square'></i>
                    <i className='sidebarIcon fab fa-twitter-square'></i>
                    <i className='sidebarIcon fab fa-pinterest-square'></i>
                </div>
            </div>
        </div>
    </div>
  )
}
