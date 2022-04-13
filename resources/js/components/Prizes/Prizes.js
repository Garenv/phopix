import React from "react";
import '../../../sass/prizes/prizes.scss';
import { Link } from 'react-router-dom';

const Prizes = () => {
    return (
        <div className="main">
            <h1>Responsive Card Grid Layout</h1>
            <ul className="cards">
                <li className="cards_item">
                    <div className="card">
                        <div className="card_image"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.samsclubresources.com%2Fis%2Fimage%2Fsamsclub%2F0079936673910_A%3F%24DT_PDP_Image%24&f=1&nofb=1" className="giftCards"/></div>
                        {/*<div className="card_content">*/}
                        {/*    <h2 className="card_title">Card Grid Layout</h2>*/}
                        {/*    <p className="card_text">Demo of pixel perfect pure CSS simple responsive card grid*/}
                        {/*        layout</p>*/}
                        {/*</div>*/}
                    </div>
                </li>
                <li className="cards_item">
                    <div className="card">
                        <div className="card_image"><img src="https://picsum.photos/500/300/?image=5" className="giftCards"/></div>
                        {/*<div className="card_content">*/}
                        {/*    <h2 className="card_title">Card Grid Layout</h2>*/}
                        {/*    <p className="card_text">Demo of pixel perfect pure CSS simple responsive card grid*/}
                        {/*        layout</p>*/}
                        {/*</div>*/}
                    </div>
                </li>
                <li className="cards_item">
                    <div className="card">
                        <div className="card_image"><img src="https://picsum.photos/500/300/?image=11" className="giftCards"/></div>
                        {/*<div className="card_content">*/}
                        {/*    <h2 className="card_title">Card Grid Layout</h2>*/}
                        {/*    <p className="card_text">Demo of pixel perfect pure CSS simple responsive card grid*/}
                        {/*        layout</p>*/}
                        {/*</div>*/}
                    </div>
                </li>
                <li className="cards_item">
                    <div className="card">
                        <div className="card_image"><img src="https://picsum.photos/500/300/?image=14" className="giftCards"/></div>
                        {/*<div className="card_content">*/}
                        {/*    <h2 className="card_title">Card Grid Layout</h2>*/}
                        {/*    <p className="card_text">Demo of pixel perfect pure CSS simple responsive card grid*/}
                        {/*        layout</p>*/}
                        {/*</div>*/}
                    </div>
                </li>
                <li className="cards_item">
                    <div className="card">
                        <div className="card_image"><img src="https://picsum.photos/500/300/?image=17" className="giftCards"/></div>
                        {/*<div className="card_content">*/}
                        {/*    <h2 className="card_title">Card Grid Layout</h2>*/}
                        {/*    <p className="card_text">Demo of pixel perfect pure CSS simple responsive card grid*/}
                        {/*        layout</p>*/}
                        {/*</div>*/}
                    </div>
                </li>
                <li className="cards_item">
                    <div className="card">
                        <div className="card_image"><img src="https://picsum.photos/500/300/?image=2" className="giftCards"/></div>
                        {/*<div className="card_content">*/}
                        {/*    <h2 className="card_title">Card Grid Layout</h2>*/}
                        {/*    <p className="card_text">Demo of pixel perfect pure CSS simple responsive card grid*/}
                        {/*        layout</p>*/}
                        {/*</div>*/}
                    </div>
                </li>
            </ul>
        </div>

    );
};

export default Prizes;
