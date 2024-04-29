import { NavLink } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";

import clsx from "clsx";
import css from "./Navigation.module.css";

const getItemClass = ({ isActive }) => {
  return clsx(css.item, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={css.listItem}>
            <NavLink to="/" className={getItemClass}>
              <RiMovie2Line className={css.logo} />
              ГОЛОВНА
            </NavLink>
          </li>
          <li className={css.listItem}>
            <NavLink to="/movies" className={getItemClass}>
              КАТАЛОГ
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
