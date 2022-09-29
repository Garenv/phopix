import '../../../sass/gallery/gallery.scss';

const Grid = (props) => {

    return (
        <>
            <li className="cards_item">
                <div>
                    <div className="card_image">
                        <img src={props.src} alt="Photo" className="gallery-img" onClick={() => props.onClick(props.userId)} />
                    </div>
                    <h2 className="userName">{props.userName} {localStorage.getItem('UserID') === props.userId ? <h6 className="you">(You)</h6> : null}</h2>
                    <h5 className="likes">Likes: {props.likes}</h5>
                    {localStorage.getItem('UserID') === props.userId ? <button className="btn-delete btn-danger" onClick={() => props.userDelete(props.userId)}>Delete</button> : null}
                </div>
            </li>
        </>
    );
}

export default Grid;
