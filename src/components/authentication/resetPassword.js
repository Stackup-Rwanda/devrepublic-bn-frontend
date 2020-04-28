import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPasswordAction } from '../../redux/actions/resetPassword'
import '../../scss/password.scss'

const resetPassword = (props) => {
  const token = props.location.search.split('token=')[1];
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationClassName, SetValidation] = useState("form-check text-center");
  const [loadingClassName, setLoadingClassName] = useState("spinner-border-sm")
  const handleSubmit = async(event) => {
      event.preventDefault();
      setLoading(true);
      setLoadingClassName("spinner-border spinner-border-sm");
      const output = await props.resetPasswordAction(password, token);
      console.log('OUTPUT+++++++', output);
      if (output.payload.status === 200) {
        toast.success(output.payload.data.message, {
          autoClose: 9000,
          pauseOnHover: true,
          position: toast.POSITION.TOP_CENTER
        });
      }
      if (output.type === 'RESET_PASSWORD_ERROR') {
        const errors = typeof output.payload.data.error === 'object' ? output.payload.error : [output.payload.error];
        errors.map((e) => toast.error(e, {
          autoClose: 9000,
          pauseOnHover: true,
          position: toast.POSITION.TOP_CENTER
        }));
      }
      setLoading(false);
      setLoadingClassName("spinner-border-sm");
}
  const handleChange = async(e) => {
    setPassword(e.target.value);
    SetValidation("was-validated form-check text-center")
  }
  return (
<div className="content">
    <div className="container p-5 justify-content-md-center">
      <form
        className={validationClassName}
        onSubmit={handleSubmit}
      >
        <div className="form-group justify-content-center align-items-center">
          <h1> Reset your password </h1>
          <input
            type="password"
            className="form-control text-center center col-md-4"
            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,30}"
            placeholder="New Password"
            value={password}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback text-lg-center">
            Use a password of at least 8 characters: uppercase, lowercase letters, numbers and special characters.
          </div>
        </div>
        <button type="submit" className="btn btn-primary col-md-2">
          <span className={loadingClassName} ></span>
          &nbsp; {loading ? 'Loading...' : 'RESET'}
        </button>
      </form>
    </div>
    </div>
  );
};

const MapStateToProps = ({ user }) => {
    return {
      user
    }
  }
export default connect(MapStateToProps, { resetPasswordAction })(resetPassword);
