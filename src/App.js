import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "muiTheme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Grid } from "@mui/material";
import { Footer, Header } from "components";
import { Announcement, Home } from "pages";
import PrivateRoute from "routes/PrivateRoute";
import Post from "pages/pages/Post";

const App = () => {
  console.log(muiTheme);
  return (
    <ThemeProvider theme={muiTheme}>
      <Grid
        container
        sx={{
          background: "#FAFAFA",
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/annoucement" element={<Announcement />} />
            <Route path="/post" element={<PrivateRoute />}>
              <Route path=":postId" element={<Post />} />
            </Route>
          </Routes>
          <div style={{ marginTop: "auto" }}>
            <Footer />
          </div>
        </BrowserRouter>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
