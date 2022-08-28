import {useState, useContext} from 'react'
import appContext from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import logo from '../assets/images/tennis-logo.jpeg'

function SignIn() {

  const {login, addUserToLocalStorage} = useContext(appContext)
  const navigate = useNavigate()
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = loginData


  const loginUser = async(loginData) => {
    try{
      setBtnDisabled(true)
      const response = await axios.post('http://localhost:5000/api/users/login', loginData)
      const {token, user} = response.data

      addUserToLocalStorage({user, token})
      login({user, token})
      navigate('/')
    } catch (error) {
      setBtnDisabled(false)
      toast.error(error.response.data.Message)
    }

  }

  const onChange = (e) => {
    setLoginData((loginData) => ({
      ...loginData,
      [e.target.id] : e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    loginUser(loginData)
  }
  
  return (
    <div className='page-containers'>
      <div className="login-container">
        <img src={logo} alt="tennis-logo" className='logo' />
        <h1>Sign In to Tennis Pal</h1>
        <form className='login-form' onSubmit={onSubmit}>
          <label>Email</label>
          <input type='email' id='email' onChange={onChange}  />
          <label>Password</label>
          <input type='password' id='password' onChange={onChange}/>

          <div className='end-of-form'>
            <button className='login' disabled={btnDisabled}>Login</button>
            <button className='no-account' onClick={() => navigate('/sign-up')}>Create Account</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn