import Button from '../UI/Button'
import classes from './Navigation.module.css'
import AuthContext from '../AutContext'
import { useContext } from 'react'

function Navigation(props) {
	const data = useContext(AuthContext)
	return (
		<nav className={classes.nav}>
			<ul>
				{data.isLoggedIn && (  
					<li>
						<a href='/'>Users</a>
					</li>
				)}
				{data.isLoggedIn && (
					<li>
						<a href='/'>Admin</a>
					</li>
				)}
				{data.isLoggedIn && (
					<li>
						<Button onClick={data.onLogout}>Logout</Button>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navigation
