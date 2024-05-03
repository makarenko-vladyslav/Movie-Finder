import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const topic = form.elements.topic.value;

    !topic.trim()
      ? toast.error("Your should to enter film title for search!")
      : onSubmit(topic);

    form.reset();
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputWrapper}>
          <button className={css.btn} type="submit">
            <IoSearch />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search films and serials"
            name="topic"
          />
        </div>
      </form>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: "400",
          style: {
            border: "1px solid #ff4800",
            padding: "16px",
            color: "#ff4800",
          },
        }}
      />
    </>
  );
}
