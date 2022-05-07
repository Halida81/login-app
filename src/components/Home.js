import classes from './Home.module.css'
import Card from '../UI/Card'
function Home(props){
    return(
<Card>
    <h1 className={classes.home}>
        Welcome back
    </h1>
</Card>
    )
}

export default Home