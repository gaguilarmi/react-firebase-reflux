import React from 'react';
import SelectedItem from './SelectedItem';

let style = {
  wrapper: {
    position: 'absolute',
    zIndex: 1000,
    textAlign: 'left',
    right: 0,
    left: 'auto',
    minWidth: 350,
    display: 'block'
  },
  ul: {
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.1)'
  }
}

class SelectedItemsList extends React.Component{
  render(){
    let total = 0;
    let currency = '$'
    let items = this.props.data.map((obj) => {
      total += obj.listPrice.amount;
      currency = obj.listPrice.currencyCode
      return <SelectedItem key={obj.id} data={obj}/>
    });

    let totalComponent = (
      <li className="text-right list-group-item" key='total'>
        <div className='row'>
          <div className="col-sm-8 col-xs-6 text-left">
            <div><strong>Total</strong></div>
          </div>
          <div className="col-sm-4 col-xs-6">
            <div className='text-right'>
                <strong className="text-success">{currency} {total.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </li>
    );

    items.push(totalComponent);

    return (
      <div style={style.wrapper}>
        <ul className='list-group' style={style.ul}>
          {items}
        </ul>
      </div>
    )
  }
}

export default SelectedItemsList;
