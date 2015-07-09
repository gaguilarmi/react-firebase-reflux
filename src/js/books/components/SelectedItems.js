import React from 'react';
import SelectedBooksStore from '../stores/SelectedBooksStore';
import SelecteditemsList from './SelectedItemsList';

let style = {
  list: {
    position: 'relative',
    zIndex: '1050'
  }
};

class SelectedItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {selectedItems: [], showSelectedItemsList: false};
    this.hasListenerEvent = false;
  }
  update(data){
    var show = this.state.showSelectedItemsList;
    if (show && data.length == 0){
      show = false;
    }
    this.setState({
      selectedItems: data,
      showSelectedItemsList: show
      });
  }

  componentWillMount() {
    this.bodyElement = document.getElementsByTagName('body');
  }

  componentDidMount(){
    this.unsubscribe = SelectedBooksStore.listen(this.update.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClick(e){
    if(this.state.selectedItems.length > 0){
      this.setState({showSelectedItemsList: !this.state.showSelectedItemsList});
    }

  }

  render(){
    let selectedItemsListComp;
    if (this.state.selectedItems.length > 0 && this.state.showSelectedItemsList){
        selectedItemsListComp = <SelecteditemsList data={this.state.selectedItems}/>;
    }

    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-default"
          onClick={this.onClick.bind(this)}
        >
          Cart
        </button>
        <div style={style.list}>{selectedItemsListComp}</div>
      </div>

    )
  }
}

export default SelectedItems;
