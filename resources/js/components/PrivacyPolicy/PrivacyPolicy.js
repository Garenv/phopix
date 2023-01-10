import React from 'react';
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import {Link} from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <>
            <Container>
                <Link to="/">
                    <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" alt="Prize Page Logo"/>
                </Link>
                <p>At Phopixel, we are committed to protecting your privacy. This privacy policy explains how we
                    collect,
                    use, and share information about you when you use our website, mobile application, and any other
                    services provided by Phopixel (collectively, the "Services").</p>

                <h5>Information We Collect</h5>

                <h5>We collect information about you in several ways when you use the Services. This includes:</h5>

                <ul>
                    <li>Information you provide to us: We collect information you provide to us when you create an
                        account, upload photos, or participate in other features of the Services. This may include your
                        name, email address, and other personal information.
                    </li>
                    <li>
                        Information we collect automatically: We automatically collect certain information about you
                        when you use the Services, such as your IP address, device type, and browser type. We may also
                        collect information about your location and your interactions with the Services, such as the
                        photos you view and the actions you take.
                    </li>
                    <li>
                        Information from third parties: We may receive information about you from third parties, such as
                        social media platforms, in order to provide you with a better experience and to personalize your
                        use of the Services.
                    </li>
                </ul>

                <h5>Use of Your Information</h5>

                <h5>We use the information we collect about you for a variety of purposes, including:</h5>

                <ul>
                    <li>
                        Providing, maintaining, and improving the Services: We use the information we collect to
                        provide, maintain, and improve the Services, including to personalize your experience, to allow
                        you to interact with other users, and to provide customer support.
                    </li>

                    <li>
                        Communicating with you: We may use the information we collect to send you updates about the
                        Services, to respond to your inquiries, and to notify you about changes to the Services.
                    </li>

                    <li>
                        Research and development: We may use the information we collect to conduct research and
                        development, to improve the Services, and to develop new products and features.
                    </li>
                </ul>

                <h5>Sharing of Your Information</h5>

                <h5>We do not sell or rent your personal information to third parties for their marketing purposes
                    without your explicit consent. However, we may share your information with third parties in the
                    following circumstances:</h5>

                <ul>
                    <li>
                        With service providers: We may share your information with third-party service providers who
                        perform services on our behalf, such as hosting, analytics, and customer support.
                    </li>

                    <li>
                        With business partners: We may share your information with our business partners for marketing
                        or other purposes.
                    </li>

                    <li>
                        For legal reasons: We may disclose your information if required to do so by law, or if we
                        believe in good faith that such action is necessary to comply with legal process, to protect the
                        rights or property of Phopixel, or to protect the personal safety of our users or the public.
                    </li>
                </ul>

                <h5>Security of Your Information</h5>

                <h5>We take reasonable measures to protect the information we collect from loss, misuse, and
                    unauthorized access, disclosure, alteration, and destruction. However, no internet or email
                    transmission is ever fully secure or error-free, so you should take special care in deciding what
                    information you send to us.</h5>

                <h5>Changes to This Privacy Policy</h5>

                <h5>We may update this privacy policy from time to time. We will post any changes on this page and, if
                    the changes are significant, we will provide a more prominent notice (including, for certain
                    Services, email notification of privacy policy changes). We encourage you to review this privacy
                    policy whenever you access the Services to stay informed about our information practices and your
                    choices.</h5>

                <h5>Contact Us</h5>

                <h5>If you have any questions or concerns about this privacy policy, please contact us at
                    info@phopixel.com.</h5>

            </Container>
        </>
    );
};

export default PrivacyPolicy;
