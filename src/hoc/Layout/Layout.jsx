import Navigation from "../../components/Navigation/Navigation";
import style from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={style.container}>
      <Navigation />
      <div className={style.main}>{props.children}</div>
    </div>
  );
};

export default Layout;
