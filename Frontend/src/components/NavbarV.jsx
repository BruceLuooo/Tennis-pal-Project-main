import React from 'react'
import {useNavigate} from 'react-router-dom'
import courts from '../assets/svg/tennis-court.svg'
import forum from '../assets/svg/forum.svg'
import rules from '../assets/svg/rules.svg'
import home from '../assets/svg/home.svg'

function NavbarV() {
  const navigate = useNavigate()

  return (
    <div className='container-test'>
      <div className='navbar-vertical'>
        <div onClick={() => navigate('/')}>
          <img src={home} alt="home" className='vertical-logo' />
          <p>Home</p>
        </div>
        <div onClick={() => navigate('/search')}>
          <img src={courts} alt="tennis-court" className='vertical-logo' />
          <p>Search</p>
        </div>
        <div onClick={() => navigate('/courts')}>
          <img src={courts} alt="tennis-court" className='vertical-logo' />
          <p>Courts</p>
        </div>
        <div onClick={() => navigate('/rules')}>
          <img src={rules} alt="rules" className='vertical-logo' />
          <p>Rules</p>
        </div>
      </div>

    </div>
  )
}

export default NavbarV