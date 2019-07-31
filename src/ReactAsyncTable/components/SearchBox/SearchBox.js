import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

const propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  placeholder: 'Search...'
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '' };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onChange(event) {
    const searchTerm = event.target.value;

    this.setState({ searchTerm });
    this.props.onChange(searchTerm);
  }

  onClear() {
    this.setState({ searchTerm: '' });
    this.props.onChange('');
  }

  render() {
    const { searchTerm } = this.state;
    const { placeholder } = this.props;

    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="far fa-search" />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          name="search"
          value={searchTerm}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {searchTerm && (
          <button
            type="button"
            className="btn async-table-search-clear"
            onClick={this.onClear}
          >
            &times;
          </button>
        )}
      </InputGroup>
    );
  }
}

SearchBox.propTypes = propTypes;
SearchBox.defaultProps = defaultProps;
export default SearchBox;
