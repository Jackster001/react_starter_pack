import React from 'react';
export const GroupModal = ({ handleClose, show, children }) => {
    const showHideClassName = show===true ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <br></br>
          <center><button onClick={handleClose}>close</button></center>
        </section>
      </div>
    );
};
