import React from 'react';
import {Link } from 'react-router';
import classNames from 'classnames';

class LateralMenu extends React.Component {
	render() {
		let current = this.props.current;
		let menu = this.props.menu.map((obj) => {
			let url = `/inbox/${obj}`;
			let klass = classNames({active: current == obj});
			return (
				<li className={klass} key={obj}>
					<Link to={url} style={{'borderRadius': 0}}>
						<i className="fa fa-fw fa-inbox"></i>
						{obj}
					</Link>
				</li>
			)
		});
		return (
			<div className="lm-container">
				<header>
					<h4>
						Books
					</h4>
				</header>
				<ul className="nav nav-pills nav-stacked no-radius">
					<li
						className={classNames({active: current == undefined})}
						key={'/'}
						>
						<Link to="/" style={{'borderRadius': 0}}>
							<i className="fa fa-fw fa-inbox"></i>
							Inbox
						</Link>
					</li>
					{menu}
				</ul>
			</div>
		);
	}
}

export default LateralMenu;
