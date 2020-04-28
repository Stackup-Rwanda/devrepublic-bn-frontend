import  React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import '../../scss/password.scss'
import { forgotPasswordAction } from '../../redux/actions/forgotPassword'

const forgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingClassName, setLoadingClassName] = useState("spinner-border-sm")
  const [validationClassName, SetValidation] = useState("form-check text-center");
  const handleSubmit = async(event) => {
      event.preventDefault();
      setLoading(true);
      setLoadingClassName("spinner-border spinner-border-sm");
      const output = await props.forgotPasswordAction(email);
      console.log('OUTPUT+++++++', output);
      if (output.payload.status === 200) {
        toast.success(output.payload.data.message, {
          autoClose: 9000,
          pauseOnHover: true,
          position: toast.POSITION.TOP_CENTER
        });
      }
      if (output.type === 'FORGOT_PASSWORD_ERROR') {
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
    setEmail(e.target.value);
    SetValidation("was-validated form-check text-center")
  }
  return(
    <div className="content">
    <div className="container p-5 justify-content-md-center">
        <form onSubmit={handleSubmit} className={validationClassName}>
            <div className="form-group justify-content-center align-items-center">
                <h1> Forgot your password </h1>
                <input 
                    type="email"
                    className="form-control text-center center col-md-4"
                    placeholder="Enter email"
                    value={email}
                    name="email"
                    pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                    onChange={handleChange}
                    required />
            </div>
            <button type="submit" className="send-mail btn btn-primary col-md-2">
            <span className={loadingClassName} ></span>
          &nbsp; {loading ? 'Loading...' : 'Send email'}</button>
        </form>
        </div>
    </div>)
};

const MapStateToProps = ({ user }) => ({
    user,
  });

export default connect(MapStateToProps, { forgotPasswordAction })(forgotPassword);
