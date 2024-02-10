/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Topbar = () => {
  return (
    <>
      <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
        <div className="row">
          <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <a className="text-body pr-3" href="">
                <i className="fa fa-phone-alt mr-2"></i>{" "}
                <span>+012 345 6789</span>
              </a>
              <span className="text-body">|</span>
              <a className="text-body px-3" href="">
                <i className="fa fa-envelope mr-2"></i>{" "}
                <span>info@example.com</span>
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-body px-3" href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-body px-3" href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-body px-3" href="">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-body px-3" href="">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-body pl-3" href="">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
