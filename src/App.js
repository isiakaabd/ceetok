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
import SingleAnnoucement from "pages/pages/SingleAnnoucement";
import ResetPassword from "components/modals/ResetPassword";
import NewPassword from "components/modals/NewPassword";
import ReplyComment from "pages/pages/components/ReplyComment";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/new-password" element={<NewPassword />} />
            <Route path="/post" element={<PrivateRoute />}>
              <Route path=":postId" element={<Post />} />
            </Route>
            <Route path="/posts" element={<Entertainment />} />

            <Route path="/user" element={<PrivateRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route
                path="create-annoucement"
                element={<CreateAnnoucement />}
              />
              <Route path="annoucement" element={<Announcement />} />
              <Route path="annoucement/:id" element={<SingleAnnoucement />} />
              <Route path="settings" element={<Settings />} />
              <Route path="all-friends" element={<AllFriend />} />
              <Route path="comment" element={<ReplyComment />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}></Route>
          </Routes>
          <div style={{ marginTop: "auto" }}>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
