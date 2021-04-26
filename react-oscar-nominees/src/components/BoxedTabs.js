import React from "react";
import Routes from "../Routes";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import "../css/boxed-tabs.css";

class BoxedTabs extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    render() {
        const {location} = this.props;

        return (
            <div className='boxed-tabs'>
                <ul className='boxed-tabs__list'>
                    {Object.keys(Routes).map((routeName, index) => {
                        return <li
                            className={
                                location.pathname === Routes[routeName].path ? 'boxed-tabs__tab--active' : 'boxed-tabs__tab'
                            }
                            key={index}
                        >
                            <Link
                                className='boxed-tabs__tab__link'
                                to={{pathname: Routes[routeName].path, search: location.search }}
                            >
                                {Routes[routeName].title}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default withRouter(BoxedTabs);
