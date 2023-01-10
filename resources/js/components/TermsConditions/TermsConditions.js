import React from 'react';
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

const TermsConditions = () => {
    return (
        <>
            <Container>
                <Link to="/">
                    <img
                        src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png"
                        className="pLogoPrizes" alt="Prize Page Logo"/>
                </Link>
                <p>Welcome to Phopixel, a photo sharing website (the "Site")! These terms and conditions (these "Terms")
                    govern your access to and use of the Site and the services, features, content, and functionality
                    offered on or through the Site (the "Services"). Please read these Terms carefully before using the
                    Services..</p>

                <h5>By accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy,
                    which is hereby incorporated by reference. If you do not agree to these Terms or the Privacy Policy,
                    you may not use the Services.</h5>

                <h5>We collect information about you in several ways when you use the Services. This includes:</h5>

                <br/>

                <h5>1. Eligibility</h5>

                <h5>You must be at least 13 years old to use the Services. If you are under the age of 13, you may not
                    use the Services. By using the Services, you represent and warrant that you are at least 13 years
                    old.</h5>

                <br/>

                <h5>2. Account Registration</h5>

                <h5>In order to access certain features of the Services, you will be required to register for an account
                    (an "Account"). You may only create an Account if you are at least 13 years old. When you create an
                    Account, you will be required to provide certain personal information, such as your name, email
                    address, and a password. You are responsible for maintaining the confidentiality of your Account
                    login information and for all activities that occur under your Account.</h5>

                <br/>

                <h5>3. User Content</h5>

                <h5>The Services allow you to post, upload, or otherwise make available content, including but not
                    limited to photos, text, graphics, and other materials (collectively, "User Content"). You retain
                    ownership of any intellectual property rights that you hold in the User Content that you post to the
                    Site. By posting User Content to the Site, you grant Phopixel a worldwide, non-exclusive,
                    royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare
                    derivative works of, display, and perform the User Content in connection with the Services and
                    Phopixel's business, including for the purpose of promoting and redistributing part or all of the
                    Services (and derivative works thereof) in any media formats and through any media channels.</h5>

                <br/>

                <h5>You are solely responsible for your User Content and the consequences of posting or publishing it.
                    You affirm, represent, and warrant that you own or have the necessary licenses, rights, consents,
                    and permissions to publish the User Content that you post; and you license to Phopixel all patent,
                    trademark, trade secret, copyright or other proprietary rights in and to such User Content for
                    publication on the Site and in accordance with these Terms.</h5>

                <h5>You agree not to post User Content that:</h5>

                <h5>
                    (a) infringes any third party's intellectual property rights or rights of publicity or privacy;
                    (b) is threatening, abusive, harassing, defamatory, or libelous;
                    (c) is vulgar, obscene, pornographic, or offensive;
                    (d) promotes or encourages illegal activity; or
                    (e) is otherwise inappropriate or harmful to the Site or Services.
                </h5>

                <h5>Phopixel has the right, but not the obligation, to monitor and remove any User Content that it
                    determines, in its sole discretion, to be inappropriate or in violation of these Terms.</h5>

                <br/>

                <h5>4. Intellectual Property</h5>

                <h5>The Services and all content and materials included on the Site, including but not limited to text,
                    graphics, logos, images, and software, are the property of Phopixel or its licensors and are
                    protected by U.S. and international copyright and trademark laws. You may not use any content or
                    materials on the Site for any commercial purpose without the express written consent of
                    Phopixel.</h5>

            </Container>
        </>
    );
};

export default TermsConditions;
