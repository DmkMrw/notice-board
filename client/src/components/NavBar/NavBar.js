import style from './NavBar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { getUser } from '../../redux/usersRedux';
import { useSelector } from 'react-redux';

const NavBar = () => {

  const user = useSelector(getUser);
  console.log('user', user);

  return (
    <div className={style.navBar}>
      <div className={style.container}>
        <div className={style.iconLeft}>
          <span className={style.main}><Link to="/">Notice Board</Link></span>
        </div>
        <div className={style.navigation}>
          <ul className={style.ulNav}>
            <li><NavLink className={({ isActive }) => isActive ? style.linkActive : undefined} to="/">Home</NavLink></li>
            {!user ? <li><NavLink className={({ isActive }) => isActive ? style.linkActive : undefined} to="/signin">Sign in</NavLink></li> : <li><NavLink className={({ isActive }) => isActive ? style.linkActive : undefined} to="/logout">Log out</NavLink></li> }
            {!user && <li><NavLink className={({ isActive }) => isActive ? style.linkActive : undefined} to="/register">Register</NavLink></li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;