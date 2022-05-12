import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import AuthContext from './AutContext'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [bgColorChange, setBgColorChange] = useState(false)

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
		localStorage.removeItem('isLoggedIn', '1')
		setIsLoggedIn(false)
	}
	return (
		<div>
			<AuthContext.Provider
				value={{
					setBgColorChange,
					isLoggedIn: isLoggedIn,
					onLogout: logoutHandler,
				}}
			>
				<Header />

				<main
					style={{
						height: '600px',
						backgroundColor: !bgColorChange ? 'white' : 'gray',
					}}
				>
					{!isLoggedIn && <Login onLogin={loginHandler} />}
					{isLoggedIn && <Home onLogout={logoutHandler} />}
				</main>
			</AuthContext.Provider>
		</div>
	)
}

export default App
