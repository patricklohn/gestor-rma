import classes from './NavBar.module.css'
import {LiaHouseDamageSolid, LiaUser, LiaBoxSolid, LiaBoxesSolid, LiaUserCircle } from "react-icons/lia";
//import { SlMenu } from "react-icons/sl";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <nav className={classes.navbar_menuLateral}>
        {/* <div className={classes.navbar_menuExpandir}>
          <SlMenu/>
        </div> */}
        <ul>
          <li>
            <a href="#">
              <span className={classes.navbar_iconLi}><LiaHouseDamageSolid /></span>
              <span className={classes.navbar_txtLi}>Home</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={classes.navbar_iconLi}><LiaUser /></span>
              <span className={classes.navbar_txtLi}>Pessoas</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={classes.navbar_iconLi}><LiaBoxSolid /></span>
              <span className={classes.navbar_txtLi}>Produtos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={classes.navbar_iconLi}><LiaBoxesSolid /></span>
              <span className={classes.navbar_txtLi}>RMA</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className={classes.navbar_iconLi}><LiaUserCircle /></span>
              <span className={classes.navbar_txtLi}>Dados</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
