import React from 'react';
import {withRouter} from 'react-router-dom';
import Spreadparser from 'spreadparser';
import NomineesByYear from '../NomineesByYear';
import SelectBox from '../components/SelectBox';
import {dataToSections, titleToId} from '../Utilities';
import Card from '../components/Card';
import SingleCheckbox from "../components/SingleCheckbox";
import CardSkeleton from "../components/CardSkeleton";
import StorageManager from "../StorageManager";
import '../css/category.css';

class Nominees extends React.Component {
    constructor(props) {
        super(props);
        const sections = Object.keys(NomineesByYear).reduce((total, year) => {
            total[year] = [];
            return total;
        }, {});

        this.options = Object.keys(NomineesByYear).map(year => {
            return {value: year, name: year};
        }).sort((a, b) => b.value - a.value);

        this.state = {
            isLoading: false,
            sections,
            currentYear: this.options[0].value,
            showWinners: false
        };
        this.storage = new StorageManager('local');
    }

    loadNominees(year) {
        this.setState({isLoading: true});
        if (this.storage.hasKey(year) === false) {
            fetch(Spreadparser.getSpreadsheetUrl(...NomineesByYear[year]))
                .then(response => response.json())
                .then(data => Spreadparser.parse(data, {titleCase: 'camelCase'}))
                .then(nominees => {
                    return dataToSections(nominees.data, x => x.category)
                })
                .then(sections => {
                    const state = {
                        isLoading: this.state.isLoading,
                        sections: {},
                        currentYear: year
                    };
                    state.sections = Object.assign(this.state.sections, {[year]: sections});
                    this.storage.setObject(year, sections);
                    this.setState(state);
                })
                .finally(() => {
                    this.setState({
                        isLoading: false,
                        sections: this.state.sections
                    });
                })
        } else {
            const state = {
                currentYear: year,
                isLoading: false
            };
            state.sections = Object.assign(this.state.sections, {[year]: this.storage.getObject(year)});
            this.setState(state);
        }
    }

    componentDidMount() {
        this.loadNominees(this.state.currentYear);
    }

    onSelect(year) {
        this.loadNominees(year);
    }

    onToggleWinners() {
        this.setState({showWinners: !this.state.showWinners});
    }

    jumpToSection(reference) {
        document.querySelector(`#${reference}`).scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const sections = this.state.sections[this.state.currentYear] || [];
        const {isLoading, showWinners} = this.state;

        const backToTop = () => {
            document.querySelector('#back-to-top-reference').scrollIntoView({
                behavior: 'smooth'
            });
        };

        return <React.Fragment>
            <SelectBox
                label='Select a year'
                onSelect={this.onSelect.bind(this)}
                id='year'
                options={this.options}
            />
            <SelectBox
                label='Jump to section'
                onSelect={this.jumpToSection.bind(this)}
                id='jump-to-section'
                options={isLoading ? [{name: 'Loading ...'}] : sections.map(s => ({value: titleToId(s.name), name: s.name}))}
            />
            <SingleCheckbox
                checked={showWinners}
                id='toggle-winner'
                onToggle={this.onToggleWinners.bind(this)}
                label='Show winners'
            />
            { isLoading
                ?
                <section className='category'>
                    <p className='category__title'>Loading nominees...</p>
                    <div className='category__cards'>
                        {Array(5).fill(null).map((item, index) => {
                            return <CardSkeleton key={index} />
                        })};
                    </div>
                </section>
                :
                sections.map((section, index) => {
                return <section className='category' key={index} id={titleToId(section.name)}>
                    <h2 className='category__title'>{section.name}</h2>
                    <ul className='category__cards u-opacity-on-hover-parent'>
                        {section.items.map((item, innerIndex) => {
                            return <Card
                                isFeatured={showWinners && item.isWinner }
                                className='u-opacity-on-hover-parent__item'
                                key={innerIndex}
                                {...item}
                            />
                        })}
                    </ul>
                    <button
                        onClick={backToTop}
                        className='category__back-to-top-button'>
                        Back to top
                    </button>
                </section>
            })}
        </React.Fragment>;
    }
}

export default withRouter(Nominees);
