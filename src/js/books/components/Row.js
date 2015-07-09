import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import SelectedBooksStore from '../stores/SelectedBooksStore';

let MyFirebase = require("../utils/MyFirebase");

class Row extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data: {}};
  }

  init(id, type){
    var self = this;
    this.firebase.child(`books/${type}/${id}`).on("child_changed", (snapshot) => {
      var data = snapshot.val();
      let newData = this.state.data;
      newData[snapshot.key()] = data;
      SelectedBooksStore.onUpdateBook(newData.id, newData);
      this.setState({data: newData});
    });
  }

  isSelected(data, currentData){
    let result = _.find(data, (obj) => obj.id == currentData.id);
    return result !== undefined;;
  }

  update(data){
      let newData = this.state.data;
      newData.selected = this.isSelected(data, newData);
      this.setState({data: newData});
  }

  componentDidMount(){
    this.init(this.state.data.id, this.state.data.type);
    this.unsubscribe = SelectedBooksStore.listen(this.update.bind(this));
  }

  componentWillMount(){
    this.firebase = MyFirebase;
    let data = this.props.data;
    data.selected = this.isSelected(SelectedBooksStore.getData(), data);
    this.setState({data: data});
  }

  componentWillUnmount(){
    this.firebase.off();
    this.unsubscribe();
  }

  onClick(){
    let data = this.state.data;
    data.selected = !data.selected;
    if (data.selected){
      SelectedBooksStore.onAddBook(data.id, data);
    }else{
      SelectedBooksStore.onRemoveBook(data.id);
    }
    this.setState({data: data});
  }

  render(){
    let item = this.state.data;
    item.authorsText = item.authors ? item.authors.join(', ') : '';
    let color = this.props.colors[item.type];
    let span = <span className="label" style={{backgroundColor: color}}>{item.type}</span>;
    let typeElement = color == undefined ? item.type : span;
    var klasess = classNames({
      'fa': true,
      'fa-square-o': item.selected == false,
      'fa-check-square-o': item.selected
    });
    return (
      <tr onClick={this.onClick.bind(this)}>
        <td><i className={klasess}></i></td>
        <td>{item.title}</td>
        <td>{item.publisher}</td>
        <td>{item.authorsText}</td>
        <td>{item.language}</td>
        <td className="text-right">{item.listPrice.currencyCode} {item.listPrice.amount}</td>
        <td>{typeElement}</td>
      </tr>
    );
  }
}

Row.defaultProps = {
  data: {}
}

export default Row;
