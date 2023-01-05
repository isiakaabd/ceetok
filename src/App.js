import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "muiTheme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Grid } from "@mui/material";
import { Footer, Header } from "components";
import { Announcement, Home } from "pages";

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
          </Routes>
          <Footer />
        </BrowserRouter>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
