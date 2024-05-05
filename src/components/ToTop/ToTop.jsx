import { PiArrowFatUpFill } from "react-icons/pi";
import css from "./ToTop.module.css";
import { useEffect, useState } from "react";

export default function ToTop() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 1000) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  }, [scrollPosition]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      {opacity <= 1 && (
        <button
          className={css.btn}
          onClick={scrollToTop}
          type="button"
          style={{ opacity: opacity }}
        >
          <PiArrowFatUpFill />
        </button>
      )}
    </>
  );
}
