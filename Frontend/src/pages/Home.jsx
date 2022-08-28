import tennisPlayers from '../assets/images/tennis-players.jpeg'
import {useNavigate} from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className='page-containers'>
      <div className='homepage'>
        <div className="homepage-text"> 
          <h1>Welcome to </h1>
          <h2>Tennis Pal!</h2>
          <h3>
            This space was created in hopes of you of finding 
            a tennis pal that will challenge you and potentially
            be you arch rival! Check out our forum section if 
            you're looking for any tennis related topics, and make 
            sure to follow all our guidelines!
          </h3>
          <div className='search-block'>
            <button onClick={() => navigate('/search')} className='find-partner-button'>Find A Partner!</button>
          </div>
        </div>
        <div>
          <img src={tennisPlayers} alt="tennis players" className='tennis-players'/>
        </div>
      </div>
    </div>
  );
}

export default Home;