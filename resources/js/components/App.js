import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../sass/HomePage/homePage.scss';
import LoginRegister from "./LoginRegister/LoginRegister";
import Gallery from "./Gallery/Gallery";
import Cookies from 'js-cookie';

const App = () => {
    const [uploadsData, setUploadsData] = useState([]);
    let { push } = useHistory();
    let authToken = Cookies.get('token');
    console.log(authToken);
    useEffect(() => {
        const getUploads = () => {
            const headers = {
                "Accept": 'application/json',
                "Authorization": `Bearer ${authToken}`
            }

            console.log(authToken);

            axios.get('http://localhost:8005/api/get-uploads', {headers})
                .then(resp => {
                    console.log(resp);
                    setUploadsData([resp]);
                    console.log(uploadsData)
                }).catch(error => {
                console.log(error);
            }).then(() => {
                console.log("yo");
            });
        };
        if (authToken !== null) {
            getUploads();
            push('/gallery');
        } else {
            console.log("User's NOT authenticated, returning to login view");
            push('/');
        }
    }, [push, authToken]);

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
