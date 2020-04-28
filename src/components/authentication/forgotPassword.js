import  { React, useState } from 'react';

const forgotPasswordComponent = (props) => (
    <div className="container p-5">
        <form action={props.forgottPassword} className="was-validated form-check">
            <div className="form-group">
                <h1 className="text-center"> Forgot your password </h1>
                <input type="email" className="form-control text-lg-center" placeholder="Enter email" required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Send email</button>
        </form>
    </div>);

export default forgotPasswordComponent;
