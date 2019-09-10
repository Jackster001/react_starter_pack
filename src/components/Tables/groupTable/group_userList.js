import React from 'react';
export const UserList = ({listShow, children}) => {
    const showHideClassName = listShow===true ? "display-block" : "display-none";
    return (
      <div className={showHideClassName}>
          {children}
      </div>
    );
};
