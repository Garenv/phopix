import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../sass/HomePage/homePage.scss';
import LoginRegister from "./LoginRegister/LoginRegister";
import Gallery from "./Gallery/Gallery";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import Support from "./Support/Support";

const App = () => {
    let { push }      = useHistory();
    let authToken     = localStorage.getItem('token');
    const queryClient = new QueryClient();

    useEffect(() => {
        if(authToken !== null) {
            push('/gallery');
        }
    }, [push, authToken]);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Switch>
                    <Route exact path="/" component={LoginRegister} />
                    <Route exact path="/gallery" component={Gallery} />
                    <Route exact path="/support" component={Support} />
                </Switch>
            </QueryClientProvider>
        </>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<Router><App/></Router>, document.getElementById('example'));
}
