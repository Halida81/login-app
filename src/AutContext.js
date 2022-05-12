import React from 'react'
const AuthContext = React.createContext({
	onLogout: () => {},
	isLoggedIn: false,
	setBgColorChange: false,
})

export default AuthContext
