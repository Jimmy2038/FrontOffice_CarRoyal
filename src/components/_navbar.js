/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LoginButton from "./_login";

const Navbar = () => {
  return (
    <>
      <div className="container-fluid position-relative nav-bar p-0">
        <div className="position-relative px-lg-5 navigation">
          <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
            <a href="" className="navbar-brand">
              <h1 className="text-uppercase text-primary mb-1">Royal Cars</h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">
                <a href="/" className="nav-item nav-link active">
                  <i className="fas fa-home  "></i> <span>Home</span>
                </a>
                <LoginButton />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
