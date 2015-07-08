import React from 'react'

class SearchBar extends React.Component {
    handleChange() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value,
            this.refs.inStockOnlyInput.getDOMNode().checked
        );
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    className='input-text'
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange.bind(this)}/>
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange.bind(this)}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

export default SearchBar;