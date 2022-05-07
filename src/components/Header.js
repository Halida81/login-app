import classes from './Header.module.css'
import Navigation from './Navigation';
function Header(props){
return <header className={classes['main-header']}>
<h1 >Header</h1>
<Navigation isLoggedIn={props.isAutentificated} onLogout={props.onLogout}/>
</header>
}

export default Header;