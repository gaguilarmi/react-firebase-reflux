import React from 'react';
import { RouteHandler } from 'react-router';
import LateralMenu from './LateralMenu';

class Main extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        activeMenu: '/',
        menu: ['python', 'javascript']
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
            	<RouteHandler {...this.props}/>
            </div>
        	</div>
        )
    }
}

export default Main;