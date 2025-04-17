import NavBar from "../components/NavBar"
import classes from "./Home.module.css"

const Home = () => {
  return (
    <div className={classes.home}>
      <NavBar />
      <div className={classes.home_container}>
        <h1>Home</h1>
      </div>
    </div>
  )
}

export default Home
