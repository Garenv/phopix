import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../../sass/HomePage/homePage.scss';
import Home from "./Home/Home";
import Gallery from "./Gallery/Gallery";
import { QueryClient, QueryClientProvider } from "react-query";
import Support from "./Support/Support";
import FaqComp from "./Faq/FaqComp";
import Prizes from "./Prizes/Prizes";

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
                    <Route exact path="/" component={Home} />
                    <Route exact path="/gallery" component={Gallery} />
                    <Route exact path="/support" component={Support} />
                    <Route exact path='/faq' component={FaqComp} />
                    <Route exact path='/prizes' component={Prizes} />
                </Switch>
            </QueryClientProvider>
        </>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(<Router><App/></Router>, document.getElementById('example'));
}
