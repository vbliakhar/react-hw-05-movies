import Loader from "react-loader-spinner";

const loader = () => (
  <Loader
    type="Puff"
    color="red"
    height={80}
    width={80}
    style={{ textAlign: "center" }}
  />
);

export default loader;
