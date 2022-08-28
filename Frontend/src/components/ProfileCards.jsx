import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../context/appContext'
import axios from 'axios'

function ProfileCards({searchedUser }) {
  const navigate = useNavigate()
  const {user} = useContext(AppContext)

<<<<<<< HEAD
  const onClick = (e) => {
    navigate(`/messages/${user._id}`)
=======
  const onClick = async (e) => {
    await axios.post('http://localhost:5000/api/users/contactUser', {searchedUserId: searchedUser._id, currentUserId: user._id})
    navigate(`/messages/${searchedUser._id}`)
>>>>>>> New-Features-and-Components
  }

  return (
    <div className='profile-card'>
      <div className='court-image'>Picture</div>
      
      <div className="court-data">
        <div className='court-info'>
          Name: {searchedUser.name}
        </div>
        <div className='court-info'>
          Level: {searchedUser.level}
        </div>
        <div className='court-info'>
          <button onClick={onClick}>send a message</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileCards