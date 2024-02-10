import React from "react";
import Topbar from "./_topbar";
import NavbarIndex from "./_navbarIndex";
import SearchIndex from "./_searchIndex";

const HeaderIndex = () => {
  return (
    <>
      <Topbar />
      <NavbarIndex />
      <SearchIndex />
    </>
  );
};

export default HeaderIndex;
