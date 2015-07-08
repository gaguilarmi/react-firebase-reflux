import React from 'react';
import Row from './Row';

class Table extends React.Component{
  render() {
    let thead = (
      <thead>
      <tr>
        <th>Title</th>
        <th>Publisher</th>
        <th>Authors</th>
        <th>Language</th>
        <th className="text-right">Price</th>
        <th>Type</th>
      </tr>
      </thead>
    );

    let tbody = (
      <tbody>
        {this.props.data.map((item) => <Row data={item} key={item.id}/>)}
      </tbody>
    );

    return (
      <div className='table-responsive'>
        <table className='table table-condensed table-striped'>
          {thead}
          {tbody}
        </table>
      </div>
    );
  }
}

export default Table;
