import React from 'react/addons';
import SelectedItems from './SelectedItems';

class HeaderBar extends React.Component{
  render(){
    return (
      <article className="hb">
        <div className="wrapper">
          <div className="row">
            <div className="col-sm-6">
              <input
                className='form-control input-sm'
                type='text'
                value={this.props.filterText}
                onChange={ (evt) => {this.props.onSearch(evt.target.value)} }
              />
            </div>
            <div className="col-sm-6">
              <div className="pull-right">
                <SelectedItems />
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default HeaderBar;
