import React, {useEffect, useState} from "react";
import Faq from "react-faq-component";
import '../../../sass/faq/faq.scss';
import { Link } from 'react-router-dom';
import ApiClient from "../../utilities/ApiClient";

const FaqComp = () => {
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        ApiClient.get('/get-faq')
            .then(resp => {
                setFaqData(resp.data);
            }).catch(err => {
            console.log(err);
        });
    },[]);

    const data = {
        title: "FAQ",
        rows: faqData
    };

    return (
        <div className="container">
            <Link to="/">
                <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/p_1081x1080_transparent.png" className="pLogoPrizes" alt="Prize Page Logo"/>
            </Link>
            <Faq data={data} />
        </div>
    );
};

export default FaqComp;
