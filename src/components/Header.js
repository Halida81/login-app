import classes from './Header.module.css'
import Navigation from './Navigation'
import AuthContext from '../AutContext'
import { useContext } from 'react'
import Button from '../UI/Button'
function Header(props) {
	const color = useContext(AuthContext)
	return (
		<header className={classes['main-header']}>
			<h1>Header</h1>
			<Navigation />
			<Button
				className={classes['color-change-btn']}
				onClick={() => color.setBgColorChange((prev) => !prev)}
			>
				Change
			</Button>
		</header>
	)
}

export default Header
