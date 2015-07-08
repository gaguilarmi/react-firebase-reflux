import React from 'react';
import _ from 'lodash';
var MyFirebase = require("./MyFirebase");

class Row extends React.Component{
  constructor(props) {
    super(props)
    this.state = {data: {}}
  }


  init(id, type){
    var self = this;
    this.firebase.child(`books/${type}/${id}`).on("child_changed", (snapshot) => {
      var data = snapshot.val();
      let newData = this.state.data;
      newData[snapshot.key()] = data;
      console.log(snapshot.key(), snapshot.val());
      this.setState({data: newData});
    });
  }

  componentDidMount(){
    this.init(this.state.data.id, this.state.data.type);
  }

  componentWillMount(){
    this.firebase = MyFirebase;
    this.setState({data: this.props.data});
  }

  componentWillUnmount(){
    this.firebase.off();
  }

  render(){
    let item = this.state.data;
    item.authors = item.authors ? item.authors.join(', ') : '';
    return (
      <tr>
        <td>{item.title}</td>
        <td>{item.publisher}</td>
        <td>{item.authors}</td>
        <td>{item.language}</td>
        <td className="text-right">{item.listPrice.currencyCode} {item.listPrice.amount}</td>
        <td>{item.type}</td>
      </tr>
    );
  }
}

Row.defaultProps = {
  data: {}
}

export default Row;
