import React from "react";
import '../../../../sass/pages/PrizeStatus/prizeStatus.scss';

const PrizeStatus = () => {
    return (
        <div className="account-setup">
            <div className="progress"><i className="fa fa-spinner fa-spin"></i></div>
            <div className="status-progress">
                <ul className="clearfix">
                    <li><a href="#" className="current">1<span className="progress-info">Prize Pending</span></a>
                    </li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                </ul>
            </div>
        </div>
    );
}

export default PrizeStatus;
