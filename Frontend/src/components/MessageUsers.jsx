import {useContext, useState} from 'react'
import AppContext from '../context/appContext'
import logo from '../assets/images/tennis-logo.jpeg'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function MessageUsers({allContacts, changeChat}) {
    const navigate = useNavigate();
    const {id} = useParams();
    const {user} = useContext(AppContext)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    function MessageUsers({allContacts}) {
        const navigate = useNavigate()
        const [currentSelected, setCurrentSelected] = useState(0)

        useEffect(() => {

            axios.post('http://localhost:5000/api/users/getUserById', {id}).then(({data}) => {
                changeChat(data);
            })
        }, [id])//


        const changeCurrentChat = (contact, index) => {
            navigate(`/messages/${contact._id}`)
            setCurrentSelected(index)
        }

        return (
            <div className='messageUsers-container'>
                <div className='message-logo'>
                    <div className="message-font">Chat</div>
                </div>
                <div className='contacts'>
                    {allContacts.map((contact, index) => {
                        return (
                            <div
                                key={contact._id}
                                className={`contact ${index === currentSelected ? 'selected' : ''}`}
                                onClick={() => navigate(`/messages/${contact._id}`)}
                            >
                                <div>
                                    <img src="" alt=""/>
                                </div>
                                <div>
                                    <h3>{contact.name}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

    export default MessageUsers;


/*
 *
 * create a new field in User model (usersContacts) which is an array with all the user ids a user has messaged
 * -> create a route/controller that returns the array in the usersContacts field
 * -> ['id1', 'id2', 'id2'] is returned
 * -> user.map -> onclick route = /messages/id
 *
 */