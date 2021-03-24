import React from "react"
import { BrowserRouter as Router, Route  } from "react-router-dom";

import Home from '../Components/Home';
import Sublist from "../Components/Sublist";

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/sublist" component={Sublist} />
            </Router>
        )
    }
}
export default AppRouter;