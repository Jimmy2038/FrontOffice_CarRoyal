import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/_home";
import Detail from "./pages/_detail";
import AfterLogin from "./pages/_AfterLogin";
import DetailIndex from "./pages/_detailIndex";
import Friends from "./pages/_friends";
import Favorites from "./pages/_favorites";
import Announcements from "./pages/_announcements";
import DetailAnnouncement from "./pages/_detailAnnouncement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/afterlogin" element={<AfterLogin />} />
        <Route path="/detail/:idAnnonce" element={<Detail />} />
        <Route path="/detailIndex/:idAnnonce" element={<DetailIndex />} />
        <Route path="/detailIndex" element={<DetailIndex />} />
        <Route path="/friends/:idUser" element={<Friends />} />
        <Route path="/favorites/:idUser" element={<Favorites />} />
        <Route path="/announcements/:idUser" element={<Announcements />} />
        <Route
          path="/detailannouncements/:idAnnonce"
          element={<DetailAnnouncement />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
