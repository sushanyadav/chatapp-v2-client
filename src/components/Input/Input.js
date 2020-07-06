import React, { useState } from 'react'
import './Input.css'
import socket from '../../socketConfig';



const Input = ({ message, sendMessage, setMessage, name, typingUser }) => {

    const [typing, settyping] = useState(false)
    let timeout = undefined;

    const sendMessageButtonClick = (e) => {
        sendMessage(e)
        socket.emit('not-typing')
    }

    const timeoutFunction = () => {
        settyping(false)
        socket.emit('not-typing')
    }

    const onEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(e)
            socket.emit('not-typing')
        }

        if (typing === false) {
            settyping(true)
            socket.emit('typing', { name })
            timeout = setTimeout(timeoutFunction, 3000);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, 3000);
        }



    }

    return (<div>
        {
            typingUser &&
            <p className="test-p"> {typingUser} is typing..</p>
        }
        <form className="form">
            <input className="input"
                placeholder="Type a message..."
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={onEnterKeyPress}
            />
            <button className="sendButton" onClick={sendMessageButtonClick}>Send</button>
        </form>
    </div>
    )
}

export default Input

