import css from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={css.container}>
      <span className={css.loader}></span>
    </div>
  );
}
