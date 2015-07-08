import React from 'react'
import HeaderBar from './HeaderBar';
import Table from './Table';
import _ from 'lodash'
let MyFirebase = require("./MyFirebase");
let firebase = MyFirebase

class FilterableTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {filterText: '', isLoading: true, data: [], selectedData: []};
  }

  updateData() {
    let filterType = this.getUrl();
    var child = filterType === undefined ? '' : `/${filterType}`;
    firebase.child(`books${child}`).once("value", (snapshot) => {
      this.setState({
        data: this.processData(snapshot.val()),
        isLoading: false
      });
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    });
  }

  getUrl() {
    let params = this.router.getCurrentParams();
    return _.isEmpty(params) ? undefined : params.filterType;
  }

  processData(data){
    let innerFunc = (list, key) => _.each(list, (obj, id) => {
      let defaultData = {type: key, id: id};
      let item = _.extend(defaultData, obj);
      resultData.push(item);
    });

    let resultData = [];
    let type = this.getUrl();

    if (type === undefined){
      _.each(data, innerFunc);
    }else{
      innerFunc(data, type);
    }
    return resultData;
  }

  onSearch(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  getDataFiltered(){
    let filters = ['title', 'publisher', 'authors', 'type'];
    let validators = [];
    let data = this.state.data;
    if (this.state.filterText.trim().length > 0){
      data = data.filter((el) => {
        validators = filters.map((filter) => {
          let regexTest = new RegExp(this.state.filterText, "gi");
          return regexTest.test(el[filter]);
        });
        return _.some(validators);
      });
    }
    return data;
  }

  componentWillMount(){
    this.router = this.context.router;
  }

  componentDidMount(){
    this.updateData();
  }

  componentWillReceiveProps(nextProps){
    if (this.props.params.filterType !== nextProps.params.filterType){
      this.setState({
        filterText: '',
        isLoading: true
      });
      this.updateData();
    }
  }

  componentWillUnmount(){
    firebase.off();
  }

  render() {
    this.getDataFiltered();
    var table = <i className="fa fa-spinner"></i>;
      if (! this.state.isLoading){
        table = <Table data={this.getDataFiltered()} />;
      }

      return (
        <div>
          <HeaderBar
            onSearch={this.onSearch.bind(this)}
            filterText={this.state.filterText}
            />
          {table}
        </div>
      )
    }
  }

FilterableTable.defaultProps = {
  params: {filterType: undefined }
};

FilterableTable.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default FilterableTable;
