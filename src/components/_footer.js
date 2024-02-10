/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Footer = () => {
  const input = {
    padding: "25px",
  };
  const container = {
    marginTop: "90px",
  };
  return (
    <>
      <div
        className="container-fluid bg-secondary py-5 px-sm-3 px-md-5"
        style={container}
      >
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Get In Touch</h4>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-white mr-3"></i>123
              Street, New York, USA
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt text-white mr-3"></i>+012 345 67890
            </p>
            <p>
              <i className="fa fa-envelope text-white mr-3"></i>info@example.com
            </p>
            <h6 className="text-uppercase text-white py-2">Follow Us</h6>
            <div className="d-flex justify-content-start">
              <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-lg btn-dark btn-lg-square" href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Usefull Links</h4>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>
                <span>Private Policy</span>
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>
                <span>Term & Conditions</span>
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>
                <span>New Member Registration</span>
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>
                <span>Affiliate Programme</span>
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>
                <span>Return & Refund</span>
              </a>
              <a className="text-body" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>
                <span>Help & FQAs</span>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Car Gallery</h4>
            <div className="row mx-n1">
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100"
                    src="assets/img/gallery-1.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100"
                    src="assets/img/gallery-2.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100"
                    src="assets/img/gallery-3.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100"
                    src="assets/img/gallery-4.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100"
                    src="assets/img/gallery-5.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100"
                    src="assets/img/gallery-6.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Newsletter</h4>
            <p className="mb-4">
              Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem
              lorem sit sed elitr sed kasd et
            </p>
            <div className="w-100 mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-dark border-dark"
                  style={input}
                  placeholder="Your Email"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary text-uppercase px-3">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <i>Lorem sit sed elitr sed kasd et</i>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark py-4 px-sm-3 px-md-5">
        <p className="mb-2 text-center text-body">
          &copy; <a href="#">Your Site Name</a>. All Rights Reserved.
        </p>
        <p className="m-0 text-center text-body">
          Designed by <a href="https://htmlcodex.com">HTML Codex</a>
        </p>
      </div>
    </>
  );
};

export default Footer;
