import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/appContext';
import { UserProfileProvider } from './context/userProfileContext';
import Home from './pages/Home';
import NavbarH from './components/NavbarH';
import NavbarV from './components/NavbarV';
import Courts from './pages/Courts';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Messages from './pages/Messages';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<AppProvider>
			<UserProfileProvider>
				<Router>
					<NavbarH />
					<NavbarV />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/search' element={<PrivateRoute />}>
							<Route path='/search' element={<Search />} />
						</Route>
						<Route path='/profile' element={<PrivateRoute />}>
							<Route path='/profile' element={<Profile />} />
						</Route>
						<Route path='/messages' element={<PrivateRoute />}>
							<Route path='/messages/:id' element={<Messages />} />
							<Route path='/messages:id' element={<Messages />} />
							<Route path='/messages' element={<Messages />} />
						</Route>
						<Route path='/courts' element={<Courts />} />
						<Route path='/sign-in' element={<SignIn />} />
						<Route path='/sign-up' element={<SignUp />} />
					</Routes>
				</Router>
				<ToastContainer autoClose={2000} pauseOnHover={false} />
			</UserProfileProvider>
		</AppProvider>
	);
}

export default App;
