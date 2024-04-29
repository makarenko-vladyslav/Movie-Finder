import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const topic = form.elements.topic.value;

    !topic.trim()
      ? toast.error("Your should to enter text for image search!")
      : onSubmit(topic);

    form.reset();
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="topic"
          />

          <button className={css.btn} type="submit">
            <IoSearch />
          </button>
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
