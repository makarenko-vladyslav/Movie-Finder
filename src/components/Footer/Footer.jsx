import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <p className={css.descriptionFooter}>© MOVIES FINDER 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}