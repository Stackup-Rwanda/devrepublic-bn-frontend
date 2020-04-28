import React, { useState } from 'react';

const resetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const handleSubmit = 10;
  return (
    <div className="container p-5">
      <form
        action={props.resetPassword}
        className="was-validated form-check"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <h1 className="text-center"> Reset your password </h1>
          <input
            type="password"
            className="form-control text-lg-center"
            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}"
            placeholder="New Password"
            required
          />
          <div className="invalid-feedback text-lg-center">
            Passwords must contain at least 8 characters, including uppercase,
            lowercase letters and numbers.
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          RESET
        </button>
      </form>
    </div>
  );
};

export default resetPassword;

// const MapStateToProps = ({ user }) => {
//     return {
//       user
//     }
//   }
// export default connect(MapStateToProps, { resetPassword })(resetPasswordComponent);
