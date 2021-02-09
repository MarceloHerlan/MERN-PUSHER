import React from 'react'
import './Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton,Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';


function Sibebar() {
    return (
        <div className='sidebar'>                
        <div className='sidebar__header'>
            <Avatar />
            <div className='sidebar_headerRight'>
                <IconButton>
                    <DonutLargeIcon />                   
                </IconButton>
                <IconButton>
                     <ChatIcon />                   
                </IconButton>
                <IconButton>
                      <MoreVertIcon />
                 </IconButton>
                
            </div>
            
        </div>
        <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <IconButton>
                     <SearchIcon />                                      
                </IconButton>
                <input placeholder='Search' type="text"/>  
                    
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sibebar
