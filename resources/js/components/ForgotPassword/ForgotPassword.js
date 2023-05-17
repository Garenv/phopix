import React, { useState } from "react";
import { Link } from 'react-router-dom';
import ApiClient from "../../utilities/ApiClient";

const ForgotPassword = () => {
    const [forgotPasswordBtnFlag, setForgotPasswordBtnFlag]         = useState(false);
    const [forgotPasswordBtnTxt, setForgotPasswordBtnTxt]           = useState("Send Forgot Password Link");
    const [forgotPasswordStatusStyle, setForgotPasswordStatusStyle] = useState(null);
    const [forgotPasswordEmail, setForgotPasswordEmail]             = useState("");

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setForgotPasswordBtnTxt(
            <button className='btn btn-primary'>
                Sending...
            </button>
        );

        let dataForgotPassword = {
            'email': forgotPasswordEmail
        };

        ApiClient.post('/forgot-password', dataForgotPassword)
            .then(resp => {
                let successMessage = resp.data.message;

                setForgotPasswordStatusStyle('forgotPasswordTextSuccess');
                setForgotPasswordBtnTxt(successMessage);

                setTimeout(() => {
                    setForgotPasswordStatusStyle('btn btn-primary');
                    setForgotPasswordBtnTxt("Send Forgot Password Link");
                },5000);

            }).catch(error => {
            let failureMessage = error.response.data.message;

            setForgotPasswordStatusStyle('forgotPasswordTextFailed');
            setForgotPasswordBtnTxt(failureMessage);

            setTimeout(() => {
                setForgotPasswordStatusStyle('btn btn-primary');
                setForgotPasswordBtnTxt("Send Forgot Password Link");
            },5000);
        });

    };

    const forgotPassWordClicked = () => {
        setForgotPasswordBtnFlag(true);
    };

    return(
        <>

            <Link to="/">
                <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" alt="Prize Page Logo"/>
            </Link>
            <div className="container mt-4">
                <form
                    onSubmit={handleForgotPassword}
                    method="POST"
                    className="mx-auto"
                >
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control col-md-6 offset-md-3"
                            placeholder="Enter your email address"
                            name="email"
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className={`btn ${!forgotPasswordBtnFlag ? "btn-primary" : forgotPasswordStatusStyle}`}
                            onClick={forgotPassWordClicked}
                        >
                            {forgotPasswordBtnTxt}
                        </button>
                    </div>
                </form>
            </div>


        </>
    );
}

export default ForgotPassword;
