import {useEffect, useState, useContext, useRef} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import AppContext from '../context/appContext'
import axios from 'axios'
import MessageUsers from '../components/MessageUsers'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'

function Messages() {
  const test = useLocation()
  const {id} = useParams()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState()

  const {user} = useContext(AppContext)

  useEffect(() => {
    axios.post('http://localhost:5000/api/users/getUserById', { id }).then(({ data }) => {
      setCurrentChat(data)
    })
}, [id])

  useEffect(() => { 
    if (user) {
      socket.current = io('http://localhost:5000')
      socket.current.emit('add-user', user._id)
    }
  }, [user])

  useEffect(() => {
    axios.post(`http://localhost:5000/api/users/getAllContactedUsers`, {user: user._id}).then(({data}) => {
      const contacted = data.usersContacted
      const uniqueContact = Array.from(contacted.reduce((prev, currentUser) => prev.set(currentUser._id, currentUser) ,new Map()).values())
      setContacts(uniqueContact)
    })   
  }, [])

  const mostRecentChat = (current) => {
    let find = contacts.find(contact => contact._id === current)
    const test = contacts.indexOf(find)
    contacts.splice(test, 1)
    contacts.unshift(currentChat)
  }

  return (
    <div className="page-containers">
      <div className='messages-container'>
        <MessageUsers allContacts={contacts}  />
        <ChatContainer currentChat={currentChat} currentUser={user} socket={socket} mostRecentChat={mostRecentChat} />
      </div>
    </div>
  )
}

export default Messages