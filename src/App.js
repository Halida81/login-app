import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Counter from './components/Counter'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const storageUserLog = localStorage.getItem('isLoggedIn')
		if (storageUserLog === '1') {
			setIsLoggedIn(true)
		}
	}, [])

	const loginHandler = async (email, password) => {
		localStorage.setItem('isLoggedIn', '1')
		setIsLoggedIn(true)
	}

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLoggedIn(false)
	}
	return (
		<div className='App'>
			<>
				<Header isAutentificated={isLoggedIn} onLogout={logoutHandler}/>
					
				
				<main>
					{!isLoggedIn && <Login onLogin={loginHandler} />}
					{isLoggedIn && <Home onLogout={logoutHandler} />}
				</main>
				<Counter/>
			</>
		</div>
	)
}

export default App
