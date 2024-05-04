import { Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

import css from "./NotFoundPage.module.css";

export default function NotFoundPages() {
  return (
    <div>
      <h2>Opps! Page not found!</h2>

      <Link to="/" className={css.linkToMain}>
        Home page {" "}
        <RiArrowGoBackLine />
      </Link>
    </div>
  );
}
