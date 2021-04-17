import React from "react";
import Spreadparser from "spreadparser";
import PageFooter from "./PageFooter";
import BoxedTabs from "./BoxedTabs";
import Categories from "./Categories";
import "../css/page.css";
import "../css/category.css";
import "../css/cards.css";
import "../css/anchor.css";
import "../css/select-box.css";

class Page extends React.Component {
    constructor(props) {
        super(props);
        const spreadsheetId = "1rhV2ypchFb1PTTzmvwQfdd6zC7Dd-5jKllYVQOnNHnU";
        this.spreadsheetUrl = Spreadparser.getSpreadsheetUrl(spreadsheetId);
        this.state = {
            isLoading: false,
            title: null,
            nominees: [],
            selections: {}
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(this.spreadsheetUrl)
            .then((response) => response.json())
            .then((json) => Spreadparser.parse(json, {titleCase: 'camelCase'}))
            .then((nominees) => {
                this.setState({
                    isLoading: false,
                    title: nominees.title,
                    nominees: nominees.data
                });
            });
    }

    render() {
        const {nominees, title, selections, isLoading} = this.state;
        const tabs = [{
            name: '⭐ Choose your favorites',
            isActive: true
        }, {
            name: 'Movies list',
            isActive: false
        }];

        const pageTopReference = 'back-to-top-reference';

        return (
            <React.Fragment>
                <main className='page' id={pageTopReference}>
                    <div className='page__navbar'>
                        <h1 className='page__title'>{title || 'Loading...'}</h1>
                    </div>
                    <BoxedTabs tabs={tabs}/>
                    {
                        isLoading
                            ?
                            <div className='page__content'>
                                <section className='category--is-full-height'>
                                    <p className='category__title'>Loading nominees...</p>
                                </section>
                            </div>
                            :
                            <div className='page__content'>
                                <Categories
                                    nominees={nominees}
                                    selections={selections}
                                    pageTopReference={pageTopReference}
                                />
                            </div>
                    }
                </main>
                <PageFooter/>
            </React.Fragment>
        );
    }
}

export default Page;
