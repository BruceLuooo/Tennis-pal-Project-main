import { useNavigate } from 'react-router-dom';
import background from '../assets/images/background.png';

function Home() {
	const navigate = useNavigate();

	return (
		<html
			className='page-containers'
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
			}}
		>
			<main className='homepage'>
				<header className='homepage-text'>
					<h1>Welcome to </h1>
					<h2>Tennis Pal</h2>
					<h3>Find a tennis pal in the Greater Toronto Area!</h3>
					<div className='search-block'>
						<button
							onClick={() => navigate('/search')}
							className='find-partner-button'
						>
							Find A Partner!
						</button>
					</div>
				</header>
			</main>
		</html>
	);
}

export default Home;
