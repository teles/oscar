import Spreadparser from "spreadparser";
import NomineeCard from "./NomineeCard";
import PageFooter from "./PageFooter";
import {groupBy} from "../utilities";
import React from "react";
import "../css/page.css";
import "../css/category.css";
import "../css/cards.css";
import "../css/anchor.css";

class Nominees extends React.Component {
    constructor(props) {
        super(props);
        const spreadsheetId = "1rhV2ypchFb1PTTzmvwQfdd6zC7Dd-5jKllYVQOnNHnU";
        this.spreadsheetUrl = Spreadparser.getSpreadsheetUrl(spreadsheetId);
        this.state = {
            isLoading: false,
            title: null,
            categories: {},
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
                    categories: groupBy(nominees.data, "category")
                });

            });
    }

    select(categoryId, cardId) {
        const selection = {[categoryId]: cardId === this.state.selections[categoryId] ? null : cardId};
        const selections = Object.assign(this.state.selections, selection);
        this.setState({
            selections
        });
    }

    render() {
        const {categories, title, selections, isLoading} = this.state;
        return (
            <React.Fragment>
                <main className='page'>
                    <div className='page__navbar'>
                        <h1 className='page__title'>{title || 'Loading...'}</h1>
                    </div>
                    {
                        isLoading
                            ? <div className='page__content'>
                                <section className='category--is-full-height'>
                                    <p className='category__title'>Loading nominees...</p>
                                </section>
                              </div>
                            : <div className='page__content'>
                                { Object.keys(categories).map((categoryName, categoryIndex) => (
                                    <section className='category' key={categoryIndex}>
                                        <h2 className='category__title'>{categoryName}</h2>
                                        <ul className='cards'>
                                            { categories[categoryName].map((card, cardIndex) => (
                                                <NomineeCard
                                                    isSelected={selections[categoryIndex] === cardIndex}
                                                    onClick={this.select.bind(this, categoryIndex, cardIndex)}
                                                    card={card}
                                                    key={cardIndex}
                                                />
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                    }
                </main>
                <PageFooter />
            </React.Fragment>
        );
    }
}
export default Nominees;
