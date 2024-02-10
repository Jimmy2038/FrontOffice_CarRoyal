import React, { useState } from "react";

import PopupLogin from "./_popupLogin";

const LoginButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn m-2 btn-outline-success"
        onClick={openPopup}
      >
        <span className="fas fa-sign-in-alt fe-16 mr-2"></span>
        Login
      </button>
      <PopupLogin isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
};

export default LoginButton;
