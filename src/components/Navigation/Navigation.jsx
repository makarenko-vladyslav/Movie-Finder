import { Link, NavLink } from "react-router-dom";
import { PiSpinnerBallBold } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";

import clsx from "clsx";
import css from "./Navigation.module.css";
import { useEffect, useState } from "react";

const getItemClass = ({ isActive }) => {
  return clsx(css.item, isActive && css.active);
};

export default function Navigation() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(
        (prevScrollPos) =>
          prevScrollPos > currentScrollPos || currentScrollPos < 10
      );
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={clsx(css.header, !visible && css.hidden)}>
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
