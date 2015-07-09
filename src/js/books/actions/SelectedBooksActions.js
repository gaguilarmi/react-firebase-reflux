import Reflux from 'reflux';

let SelectedBooksActions = Reflux.createActions([
  'addBook',
  'removeBook',
  'updateBook'
]);

export default SelectedBooksActions;
