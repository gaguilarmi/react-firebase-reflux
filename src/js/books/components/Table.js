import React from 'react';
import Row from './Row';
import _ from 'lodash';

class Table extends React.Component{
  render() {
    let thead = (
      <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Publisher</th>
        <th>Authors</th>
        <th>Language</th>
        <th className="text-right">Price</th>
        <th>Type</th>
      </tr>
      </thead>
    );

    var colors = {};
    _.each(this.props.menu, (obj) => {
      colors[obj.name] = obj.color;
    });

    let tbody = (
      <tbody>
        {this.props.data.map((item) => {
          return <Row data={item} key={item.id} colors={colors}/>
        })}
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
