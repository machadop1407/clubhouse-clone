import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/main";
import { SignIn } from "./pages/sign-in";

import { Room } from "./pages/room";
import { StreamCall } from "@stream-io/video-react-sdk";
import { useUser } from "./user-context";
import Cookies from "universal-cookie";

export default function App() {
  const { call, setUser, setCall } = useUser();
  const cookies = new Cookies();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/room/:roomId"
          element={
            call ? (
              <StreamCall call={call}>
                <Room />{" "}
              </StreamCall>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <div>
        <button
          className="logout-button"
          onClick={() => {
            cookies.remove("token");
            cookies.remove("name");
            cookies.remove("username");
            setUser(null);
            setCall(undefined);
            window.location.pathname = "/sign-in";
          }}
        >
          {" "}
          Logout
        </button>
      </div>
    </Router>
  );
}
// {/* <StreamVideo client={client}>
//   <StreamCall call={call}>
//     {/** We will introduce the <MyUILayout /> component later */}
//     * <MyUILayout />
//   </StreamCall>
// </StreamVideo>; */}
