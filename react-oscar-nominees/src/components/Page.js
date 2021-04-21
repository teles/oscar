import React from "react";
import {dataToSections, titleToId} from "../Utilities";
import Spreadparser from "spreadparser";
import PageFooter from "./PageFooter";
import BoxedTabs from "./BoxedTabs";
import PageSection from "./PageSection";
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
            activeTab: 'favorites',
            sections: {
                favorites: {
                    items: [],
                    options: [],
                    tabName: '⭐ Choose your favorites'
                },
                movies: {
                    items: [],
                    options: [],
                    tabName: 'Movies list'
                }
            }
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
                    sections: {
                        favorites: {
                            items: dataToSections(nominees.data, x => x.category, nominee => {
                                return {
                                    title: nominee.nominees,
                                    subtitle: nominee.movie.name,
                                    image: nominee.image
                                };
                            }),
                            tabName: this.state.sections.favorites.tabName,
                        },
                        movies: {
                            items: dataToSections(nominees.data, x => x.movie.name, nominee => {
                                return {
                                    title: nominee.movie.name,
                                    subtitle: nominee.category,
                                    image: nominee.image
                                }
                            }).sort((a, b) => b.items.length - a.items.length),
                            tabName: this.state.sections.movies.tabName
                        }
                    }
                });

                this.setState({
                    sections: {
                        favorites: Object.assign(this.state.sections.favorites, {
                            options: this.state.sections.favorites.items.map(item => ({
                                value: `#${titleToId(item.name)}`,
                                name: item.name
                            }))
                        }),
                        movies: Object.assign(this.state.sections.movies, {
                            options: this.state.sections.movies.items.map(item => ({
                                value: `#${titleToId(item.name)}`,
                                name: item.name
                            }))
                        })
                    }
                });
            });
    }

    render() {
        const {sections, title, isLoading, activeTab} = this.state;
        const tabs = {
            active: this.state.activeTab,
            items: Object.keys(this.state.sections).map((sectionName) => {
                return {
                    id: sectionName,
                    name: this.state.sections[sectionName].tabName,
                };
            })
        };

        const onSelectTab = tabId => {
            this.setState({activeTab: tabId});
        };

        const pageTopReference = 'back-to-top-reference';

        return (
            <React.Fragment>
                <main className='page' id={pageTopReference}>
                    <div className='page__navbar'>
                        <h1 className='page__title'>{title || 'Loading...'}</h1>
                    </div>
                    <BoxedTabs tabs={tabs} onSelect={onSelectTab} />
                    {
                        isLoading
                            ?
                            <div className='page__content'>
                                <section className='category--is-full-height'>
                                    <p className='category__title'>Loading...</p>
                                </section>
                            </div>
                            :
                            <div className='page__content'>
                                <PageSection
                                    id={activeTab}
                                    items={sections[activeTab]}
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
