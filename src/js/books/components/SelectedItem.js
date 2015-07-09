import React from 'react';
import SelectedBooksStore from '../stores/SelectedBooksStore';
class SelectedItem extends React.Component{
  remove(id){
      SelectedBooksStore.onRemoveBook(id);
  }

  render(){
    let item = this.props.data;
    return (
      <li className='list-group-item'>
        <div className='row'>
          <div className="col-sm-8 col-xs-6">
            <div><i className="fa fa-times text-danger" onClick={this.remove.bind(this, item.id)}></i>  {item.title}</div>
            <span className="text-muted small">{item.type}</span>
          </div>
          <div className="col-sm-4 col-xs-6">
            <div className='text-right'>
                <span className="text-success">{item.listPrice.currencyCode} {item.listPrice.amount}</span>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default SelectedItem;
