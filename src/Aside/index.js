import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import useStyles from "isomorphic-style-loader/useStyles";

const Aside = (props) => {
  useStyles(styles);
  const handleClick = () => {
    console.log("props", props);
    console.log("aside");
  };

  const [text, setText] = useState("aside");
  const ref = useRef(null);

  useEffect(() => {
    setText("hydrated finished");
    ref.current.style.background = 'red';
  }, []);
  return <div onClick={handleClick} ref={ref} className={styles.text}>{text}</div>;
};

export default Aside;
