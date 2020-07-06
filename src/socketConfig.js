import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:5000/");
//const socket = openSocket("https://sushan-chat-app-v2.herokuapp.com/");

export default socket;