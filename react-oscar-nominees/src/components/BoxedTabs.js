import React from "react";
import "../css/boxed-tabs.css";

class BoxedTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.tabs
        }
    }

    select(tab) {
        this.setState({
            tabs: Object.assign(this.state.tabs, (this.state.tabs, {
                active: tab.id
            }))
        });
        this.props.onSelect(tab.id);
    }

    render() {
        const {tabs} = this.state;
        return (
            <div className='boxed-tabs'>
                <ul className='boxed-tabs__list'>
                    {tabs.items.map((tab, index) => {
                        return (
                            <li
                                key={index}
                                onClick={this.select.bind(this, tab, index)}
                                className={tabs.active === tab.id ? 'boxed-tabs__tab--active' : 'boxed-tabs__tab'} >
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
