import React from "react";
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import PageFooter from "./PageFooter";
import BoxedTabs from "./BoxedTabs";
import Routes from "../core/Routes";
import "../css/page.css";

class Page extends React.Component {
    componentDidMount() {
        this.setState({isLoading: true});
    }

    render() {
        const pageTopReference = 'back-to-top-reference';

        return (
            <React.Fragment>
                <div className='page' id={pageTopReference}>
                    <div className='page__navbar'>
                        <h1 className='page__title'>Oscar Nominees</h1>
                    </div>
                    <BoxedTabs/>
                    <main className='page__content'>
                        <Switch>
                            {Object.keys(Routes).map(routeName => {
                               return <Route
                                   exact={Routes[routeName].exact}
                                   key={routeName}
                                   path={Routes[routeName].path}
                                   component={Routes[routeName].component}
                               />
                            })}
                        </Switch>
                    </main>
                </div>
                <PageFooter/>
            </React.Fragment>
        );
    }
}

export default withRouter(Page);
