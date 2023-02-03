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
import CreatePost from "pages/pages/CreateAdvert";
import CreateAnnoucement from "pages/pages/CreateAnnoucement";
import SingleAnnoucement from "pages/pages/SingleAnnoucement";
import ResetPassword from "components/modals/ResetPassword";
import NewPassword from "components/modals/NewPassword";
import ReplyComment from "pages/pages/components/ReplyComment";
import Live from "pages/live";
import Trending from "pages/trending";
import CreateAdvert from "pages/pages/CreateAdvert";
import Categories from "pages/home/categories";
import Ads from "pages/Ads";
import AdminRoute from "routes/AdminRoute";
import AllUsers from "pages/admin";
import Recent from "pages/recent";
import New from "pages/new";

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<Live />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/new" element={<New />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/categories" element={<Categories />} />
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
              <Route path="create-advert" element={<CreateAdvert />} />
              <Route path="annoucement" element={<Announcement />} />
              <Route path="annoucement/:id" element={<SingleAnnoucement />} />
              <Route path="ads/:id" element={<Ads />} />
              <Route path="settings" element={<Settings />} />
              <Route path="all-friends" element={<AllFriend />} />
              <Route path="comment" element={<ReplyComment />} />
            </Route>

            <Route path="admin" element={<AdminRoute />}>
              <Route path="all-users" element={<AllUsers />} />
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
