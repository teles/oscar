import React from "react";
import "../css/boxed-tabs.css";

class BoxedTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: props.tabs,
            activeTabIndex: props.tabs.findIndex(tab => tab.isActive === true)
        }
    }
    select(tabIndex) {
        this.setState({
            activeTabIndex: tabIndex
        });
    }

    render() {
        const {tabs, activeTabIndex} = this.state;
        return (
            <div className='boxed-tabs'>
                <ul className='boxed-tabs__list'>
                    {tabs.map((tab, index) => {
                        return (
                            <li
                                key={index}
                                onClick={this.select.bind(this, index)}
                                className={activeTabIndex === index ? 'boxed-tabs__tab--active' : 'boxed-tabs__tab'}>
                                {tab.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }

}
export default BoxedTabs;
