import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import useStyles from "isomorphic-style-loader/useStyles";

const Navbar = (props) => {
  useStyles(styles);
  const handleClick = () => {
    console.log("props", props);
    console.log("navbar");
  };

  const [text, setText] = useState("navbar");
  const ref = useRef(null);

  useEffect(() => {
    setText("hydrated finished");
    ref.current.style.background = "blue";
  }, []);
  return (
    <div onClick={handleClick} ref={ref} className={styles.text}>
      {text}
    </div>
  );
};

export default Navbar;
