import React from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";

const ShowProfile = (props) => {
  // const [movies, setMovies] = useState([]);
  const { isLoggedIn } = props;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <hr />
      <Profile />
    </div>
  );
};

export default ShowProfile;
