import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'
import socket from '../../socketConfig';
//import io from "socket.io-client";
import GotoJoinPage from './GotoJoinPage';
import './Chat.css';
import TextContainer from '../TextContainer/TextContainer';

//let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const [typingUser, settypingUser] = useState('')

    //const ENDPOINT = "http://localhost:5000"
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        //socket = io(ENDPOINT);

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error) => { //sending name and room to server that is handling socket.on('join')
            if (error) {
                setError(error)
            }
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [location.search])
    //}, [ENDPOINT, location.search])


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

    }, [messages])

    useEffect(() => {
        socket.on('roomData', (message) => {

            setUsers(message.users)
        })
    }, [])


    useEffect(() => {
        socket.on('display', (name) => {
            settypingUser(name)
        })

    }, [typingUser])


    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () =>  //sending message to server
                setMessage('') //this callback runs after sending
            )
        }
    }


    return (

        error ? (
            <GotoJoinPage />
        ) : (

                <div className="outerContainer">
                    <div className="container">
                        <InfoBar room={room} />
                        <Messages messages={messages} name={name} />
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} name={name} typingUser={typingUser} />
                    </div>
                    <TextContainer users={users} />
                </div>
            )


    )
}

export default Chat



