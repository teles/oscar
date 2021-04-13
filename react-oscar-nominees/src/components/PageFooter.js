import React from "react";

class PageFooter extends React.Component {
    render() {
        return (
            <footer className='page__footer'>
                <div className='page__footer__content'>
                    <p>Made by&nbsp;
                        <a className='anchor--dashed' href="https://github.com/teles" target='_blank' rel="noreferrer">Teles</a>
                        &nbsp;with
                        <a className='anchor' href="https://github.com/spreadlab/spreadparser" target="_blank" rel="noreferrer"><strong>&nbsp; Spreadparser</strong></a>, ❤️ and React.</p>
                </div>
            </footer>
        )
    }
}
export default PageFooter;
