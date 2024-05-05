import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const topic = form.elements.topic.value.trim();

    !topic.trim()
      ? toast.error("Enter film title for search")
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

        <Toaster
          reverseOrder={false}
          toastOptions={{
            duration: "400",
            icon: null,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#d9212f",
              textWrap: "nowrap",
              display: "block",
              minWidth: "220px"
            },
          }}
          containerStyle={{
            position: "absolute",
            top: 60,
            right: 0,
          }}
        />
      </form>
    </>
  );
}
