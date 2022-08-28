import { useNavigate  } from 'react-router-dom'
import { useContext } from 'react'
import appContext from '../context/appContext'
import TennisLogo from '../assets/images/tennis-logo.jpeg'


function NavbarH() {

  const {token, removeUserFromLocalStorage, setLoggedIn} = useContext(appContext)
  const navigate = useNavigate()

  const onLogout = () => {
    removeUserFromLocalStorage()
    setLoggedIn({user: null, token: null})
    navigate('/')
  }

  if (token) {
    return (
      <div className='navbar-horizontal '>
        <div className="start" onClick={() => navigate('/')}>
          <img src={TennisLogo} alt="tennislogo" className='logo' />
          <div className='font'>Tennis-Pal</div>
        </div>
        
        <nav >
          <ul className="navigation-horizontal">
            <li onClick={() => navigate('/messages')}>Messages</li>
            <li onClick={() => navigate('/profile')}>Profile</li>
            <li onClick={onLogout}>Logout</li>
          </ul>
        </nav>
      </div>
    )} else {
      return (
        <div className='navbar-horizontal '>
          <div className="start" onClick={() => navigate('/')}>
            <img src={TennisLogo} alt="tennislogo" className='logo' />
            <div className='font'>Tennis-Pal</div>
          </div>
          
          <nav >
            <ul className="navigation-horizontal">
              <li onClick={() => navigate('/sign-in')}>Log-in/  Sign-up</li>
            </ul>
          </nav>
       </div>
      )
    }
}
    

export default NavbarH

