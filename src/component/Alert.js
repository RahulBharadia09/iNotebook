// it a alert component where we need to pass just a msg and a type of alert
import React from "react";

const Alert = (props) => {
  return (
    <div className="mb-1" style={{height:'50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.alert.msg}</strong>
      </div>}
    </div>
  )
}

export default Alert;
