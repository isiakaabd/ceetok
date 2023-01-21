import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "muiTheme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Footer, Header } from "components";
import { Announcement, Home } from "pages";
import PrivateRoute from "routes/PrivateRoute";
import Post from "pages/pages/Post";
import Profile from "pages/user/Profile";
import Settings from "pages/user/Settings";
import AllFriend from "pages/pages/components/AllFriend";
import Entertainment from "pages/Entertainment";
import CreatePost from "pages/pages/CreatePost";
import CreateAnnoucement from "pages/pages/CreateAnnoucement";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<PrivateRoute />}>
              <Route path=":postId" element={<Post />} />
              <Route path="" element={<Entertainment />} />
            </Route>
            <Route path="/posts" element={<PrivateRoute />}>
              <Route path="" element={<Entertainment />} />
            </Route>

            <Route path="/user" element={<PrivateRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route
                path="create-annoucement"
                element={<CreateAnnoucement />}
              />
              <Route path="annoucement" element={<Announcement />} />
              <Route path="settings" element={<Settings />} />
              <Route path="all-friends" element={<AllFriend />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}></Route>
          </Routes>
          <div style={{ marginTop: "auto" }}>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
