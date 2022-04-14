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
                    <h2 className="card_title">{props.userName}</h2>
                    <span style={{display: 'none'}}>{props.currentUserClicks}</span>
                    <h2 className="likes">Likes: {likes}</h2>
                    {localStorage.getItem('UserID') === props.userId ? <button onClick={() => props.userDelete(props.userId)}>delete</button> : null}
                </div>
            </li>
        </>
    );
}

export default Grid;
