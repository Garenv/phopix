import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { UserProvider } from '../utilities/UserContext';
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
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./TermsConditions/TermsConditions";
import SelectedWinners from "./SelectedWinners/SelectedWinners";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Settings from "./Settings/Settings";
import {DarkModeContext} from "../utilities/DarkModeContext";

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute path="/gallery" component={Grid} />
                    <ProtectedRoute path="/yourPrizes" component={YourPrizes} />
                    <ProtectedRoute path="/prizeStatus" component={PrizeStatus} />
                    <ProtectedRoute path="/thisWeeksWinners" component={SelectedWinners} />
                    <ProtectedRoute path="/settings" component={Settings} />
                    <Route path="/support" component={Support} />
                    <Route path='/faq' component={FaqComp} />
                    <Route path='/prizes' component={Prizes} />
                    <Route path='/past-winners' component={PastWinners} />
                    <Route path='/privacyPolicy' component={PrivacyPolicy} />
                    <Route path='/termsAndConditions' component={TermsConditions} />
                    <Route path='/password/reset' component={ForgotPassword} />
                    <Route path= "*" component={PageNotFound} />
                </Switch>
            </Router>
        </>
    );
}

const container = document.getElementById('example');
const root = createRoot(container);
root.render(<UserProvider><Router><App/></Router></UserProvider>);
