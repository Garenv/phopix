import React from "react";
import Faq from "react-faq-component";
import '../../../sass/faq/faq.scss';
import { Link } from 'react-router-dom';

const data = {
    title: <h1 className="faqTitle">FAQ</h1>,
    rows: [
        {
            title: <b>What does Phopixel mean?</b>,
            content: `Phopixel (pronounced 'Phoh-piksel') is a combination of two words - Photo and Pixel. Since the app revolves around these two words, might as well combine them!`,
        },
        {
            title: <b>How does it work?</b>,
            content: "It's simple! All you need to do is upload a photo and every Wednesday there will be a 1st, 2nd and 3rd place winner based on the number of likes your photo accumulated over the week.  Each winner will receive a prize consistent with which place they got in :)",
        },
        {
            title: <b>What is the goal of Phopixel?</b>,
            content: "Our goal is to give something back to the world and what better way to do that than giving out prizes to people who won them fair and square?",
        },
        {
            title: <b>Is it free and is there a catch?</b>,
            content: `There's no catch at all, it's completely free to participate and ALWAYS will be.  We'll NEVER ask you for payment information simply because, again, it's completely free!`
        },
        {
            title: <b>Where is Phopixel based?</b>,
            content: `We're based in NYC!`
        },
        {
            title: <b>What kind prizes can I win?</b>,
            content: `For now, just gift cards of your choice so if you're in 1st place, you'll win a $50 gift card, 2nd place wins a $25 gift card and 3rd place wins a $10 gift card.  However, we'll be adding bigger prizes that aren't gift cards.  Some of them we think you'll enjoy, if you win!`,
        },
        {
            title: <b>How and when can I receive my prize?</b>,
            content: `We'll either mail it out to you or we can send it to you electronically (depending on the prize awarded).  If you'd like your prize mailed to your home, then it'd probably take a few days but if you'd like your prize electronically - it's instant!`,
        },
    ],
};

const FaqComp = () => {
    return (
        <div className="container">
            <Link to="/">
                <img src="https://cruskip.s3.us-east-2.amazonaws.com/assets/images/phopix/logos/phopixLogo_v2.png" className="phopixLogo" alt=""/>
            </Link>
            <Faq data={data} />
        </div>
    );
};

export default FaqComp;
