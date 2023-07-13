import useStyles from "isomorphic-style-loader/useStyles";
import styles from "./index.module.scss";
import Aside from "./Aside";
import NavBar from "./Navbar";

function App() {
  useStyles(styles);

  return (
    <div>
      <h1
        className={styles.h1}
        onClick={() => {
          console.log("can not work");
        }}
      >
        not interactive
      </h1>
      <Aside __island height={100} />
      <NavBar __island height={200} />
    </div>
  );
}

export default App;
