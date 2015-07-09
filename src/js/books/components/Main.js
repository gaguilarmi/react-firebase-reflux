import React from 'react';
import { RouteHandler } from 'react-router';
import LateralMenu from './LateralMenu';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeMenu: '/',
      menu: [{name: 'python', tag: 'Python', color: '#65bd77', icon: 'fa-star'},
      {name: 'javascript', tag: 'Javascript', color: '#ffc333', icon: 'fa-star'}]
    };
  }
  render() {
    return (
      <div className = "row" >
        <div className = "col-md-2" >
          <LateralMenu
            menu={this.state.menu}
            current={this.props.params.filterType}
            />
        </div>
        <div className = "col-md-10" >
          <RouteHandler {...this.props} menu={this.state.menu}/>
        </div>
      </div>
    )
  }
}

Main.defaultProps = {
  menu: []
}

export default Main;
