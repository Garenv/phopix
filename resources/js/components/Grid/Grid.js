import React, { useState } from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    const [likes, setLikes] = useState(props.likes);

    return (
        <>
            <li className="cards_item">
                <div>
                    <div className="card_image">
                        <img src={props.src} alt="Photo" className="gallery-img" onClick={() => props.onClick(props.userId, props.currentUserClicks > 1 ? setLikes(props.likes) : setLikes(props.likes + 1))}/>
                    </div>
                    <h2 className="userName">{props.userName} {localStorage.getItem('UserID') === props.userId ? <h6 className="you">(You)</h6> : null}</h2>
                    <span style={{display: 'none'}}>{props.currentUserClicks}</span>
                    <h5 className="likes">Likes: {likes}</h5>
                    {localStorage.getItem('UserID') === props.userId ? <button className="btn-danger" onClick={() => props.userDelete(props.userId)}>Delete</button> : null}
                </div>
            </li>
        </>
    );
}

export default Grid;
