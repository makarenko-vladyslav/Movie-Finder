import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPages() {
  return (
    <div>
      <p>Opps! Page not found!</p>
      <p>
        Повернутись на{" "}
        <Link to="/" className={css.linkToMain}>
          головну сторінку
        </Link>
      </p>
    </div>
  );
}
