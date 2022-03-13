import React, { useState } from 'react';
import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {
    const [likes, setLikes] = useState(props.likes);

    const createUserPhotoNodes = () => {
        return (
            <>
                <img src={props.src} alt="Photo" className="gallery-img" onClick={() => props.onClick(props.userId, props.currentUserClicks > 1 ? setLikes(props.likes) : setLikes(props.likes + 1))}/>
                <div className="userData">
                    <h2 className="userName">{props.userName}</h2>
                    <span style={{display: 'none'}}>{props.currentUserClicks}</span>
                    <h2 className="likes">Likes {likes}</h2>
                    {localStorage.getItem('UserID') === props.userId ? <button onClick={() => props.userDelete(props.userId)}>delete</button> : null}
                </div>
            </>
        );
    };

    return (
        <>
            {createUserPhotoNodes()}
        </>
    );
}

export default Grid;
