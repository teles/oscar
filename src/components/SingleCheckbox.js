import React from "react";
import "../css/single-checkbox.css";

class SingleCheckbox extends React.Component {

    render() {
        const {id, label, onToggle } = {
            id: this.props.id || null,
            label: this.props.label || null,
            onToggle: (event) => this.props.onToggle ? this.props.onToggle(event.target.value) : x => x
        };

        return (
            <div className='single-checkbox'>
                <input
                    id={id}
                    type='checkbox'
                    className='single-checkbox__checkbox'
                    onChange={onToggle}
                />
                {label && <label htmlFor={id} className='single-checkbox__label'>{label}</label> }
            </div>
        )
    }
}

export default SingleCheckbox;
