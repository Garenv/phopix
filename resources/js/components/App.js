import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../sass/HomePage/homePage.scss';
import LoginRegister from "./LoginRegister/LoginRegister";
import Gallery from "./Gallery/Gallery";
import Cookies from 'js-cookie';

const App = () => {
    const [token, setToken] = useState("");
    const [uploadsData, setUploadsData] = useState([]);
    let history = useHistory();

    useEffect(() => {
        let authToken = Cookies.get('token');
        setToken(authToken);

        if (authToken !== null) {
            getUploads(authToken);
            return history.push('/gallery');
        }
        console.log("User's NOT authenticated, returning to login view");
        return history.push('/');
    });

    const getUploads = () => {
        const headers = {
            "Accept": 'application/json',
            "Authorization": `Bearer ${token}`
        }

        axios.get('http://localhost:8005/api/get-uploads', {headers})
            .then(resp => {
                console.log(resp);

                // setUploadsData([resp]);
            }).catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            <Switch>
                <Route exact path="/" component={LoginRegister} />
                <Route exact path="/gallery" component={Gallery} />
            </Switch>
        </>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<Router><App/></Router>, document.getElementById('example'));
}
