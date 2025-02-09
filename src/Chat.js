import { Avatar,IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import './Chat.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'

function Chat({messages}) {
    const[input,setInput]=useState('')
    const sendMessage=async(e)=>{
        e.preventDefault()
        
        await axios.post('/messages/new',{
            message:input,
            name:'el lobo',
            timestamp:'just now',
            received:false, 
        })

        setInput('')
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>last seen...</p>
                </div>

                <div className="chat__headerRight">
                <IconButton>
                <SearchIcon />                 
                </IconButton>
                <IconButton>
                <AttachmentOutlinedIcon/>           
                </IconButton>
                <IconButton>
                <MoreVertIcon />
                </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                <p className={`chat__message ${message.received && 'chat__reciever'}`}>
                    <span className="chat__name">{message.name}</span>
                        {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp}
                    </span>                   
                    
                </p>

                ))}
                
                
             
            </div>
            <div className="chat__footer">
                <InsertEmoticonOutlinedIcon />
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
