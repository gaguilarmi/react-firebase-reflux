import Reflux from 'reflux';
import _ from 'lodash';
import SelectedBooksActions from '../actions/SelectedBooksActions';

import MyFirebase from "../utils/MyFirebase";
let selectedBooks = {};

var SelectedBooksStore = Reflux.createStore({
  listenables: SelectedBooksActions,
  init: function(){
    console.log('SelectedBooksStore loaded');
  },
  onAddBook: function(id, data){
    selectedBooks[id] = data;
    this.trigger(this._getData(selectedBooks));
  },
  onUpdateBook: function(id, data){
    selectedBooks[id] = data;
    this.trigger(this._getData(selectedBooks));
  },
  onRemoveBook: function(id){
    delete selectedBooks[id];
    this.trigger(this._getData(selectedBooks));
  },
  // this will be called by all listening components as they register their listeners
  getDefaultData: function() {
      return selectedBooks;
  },
  _getData(list){
    return _.values(list);
  },
  getData(){
    return this._getData(selectedBooks);
  }
});

export default SelectedBooksStore;
