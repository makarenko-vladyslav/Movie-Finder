import css from "./LoadMore.module.css";

export default function LoadMore({ onClick }) {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClick}>Load next</button>
    </div>
  );
}