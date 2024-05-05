import { Link, NavLink } from "react-router-dom";
import { PiSpinnerBallBold } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";

import clsx from "clsx";
import css from "./Navigation.module.css";

const getItemClass = ({ isActive }) => {
  return clsx(css.item, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link to="/" className={css.logo}>
          <BiCameraMovie className={css.logoMovie} />
          <PiSpinnerBallBold className={css.logoSpinner} />
          <PiSpinnerBallBold className={css.logoSpinner2} />
        </Link>

        <ul className={css.navList}>
          <li className={css.listItem}>
            <NavLink to="/" className={getItemClass}>
              HOME
            </NavLink>
          </li>
          <li className={css.listItem}>
            <NavLink to="/movies" className={getItemClass}>
              MOVIES
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
