import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import '../../sass/HomePage/homePage.scss';
import Home from "./Home/Home";
import Support from "./Support/Support";
import FaqComp from "./Faq/FaqComp";
import Prizes from "./Prizes/Prizes"
import PageNotFound from "./PageNotFound/PageNotFound";
import PastWinners from "./PastWinners/PastWinners";
import Grid from "./Grid/Grid";
import YourPrizes from "./Pages/YourPrizes/YourPrizes";
import PrizeStatus from "./Pages/PrizeStatus/PrizeStatus";
import ProtectedRoute from "./Routes/ProtectedRoute";

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute path="/gallery" component={Grid} />
                    <ProtectedRoute path="/yourPrizes" component={YourPrizes} />
                    <ProtectedRoute path="/prizeStatus" component={PrizeStatus} />
                    <Route path="/support" component={Support} />
                    <Route path='/faq' component={FaqComp} />
                    <Route path='/prizes' component={Prizes} />
                    <Route path='/past-winners' component={PastWinners} />
                    <Route path= "*" component={PageNotFound} />
                </Switch>
            </Router>
        </>
    );
}

const container = document.getElementById('example');
const root = createRoot(container);
root.render(<Router><App/></Router>);
