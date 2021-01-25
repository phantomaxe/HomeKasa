import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  // category section
  categorySection: {
    paddingLeft: 17,
  },
  categoryBox: {
    cursor: 'pointer',
    borderRadius: '3px 3px 0 0',
  },
  activeCategoryBox: {
    background: '#FFECF2',
  },
  addEditCategoryBox: {
    cursor: 'pointer',
    borderRadius: '3px 3px 0 0',
  },
  activeAddEditCategoryBox: {
    background: '#FFECF2',
  },
  divider: {
    backgroundColor: '#FFFFFF',
    height: 3,
  },
  activeDivider: {
    backgroundColor: '#FF4081',
  },
  category: {
    padding: '7px 20px 4px',
    fontSize: 16,
    color: '#FF4081',
  },
  activeCategory: {
    fontWeight: 'bold',
  },
  addEditCategory: {
    padding: '7px 20px 4px',
    fontSize: 12,
    color: '#FF4081',
  },
  searchSection: {
    marginLeft: 'auto',
    marginTop: -16,
  },
  // mortgage section
  totalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalAmountNumber: {
    fontSize: 24,
  },
  addButton: {
    marginLeft: 'auto',
    backgroundColor: '#546471',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#546471',
    },
  },
  tableTitle: {
    fontSize: 12,
    color: '#5F5F5F',
    padding: '5px 16px',
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0',
    cursor: 'pointer',
  },
  sortIconStyle: {
    fontSize: 12,
  },
  tableCell: {
    padding: '8px 16px',
  },
  menuIcon: {
    marginRight: 8,
  },
  detail: {
    padding: '25px 16px',
  },
  detailTitle: {
    fontSize: 20,
    marginBottom: 19,
  },
  detailName: {
    color: '#7F7F7F',
    fontSize: 14,
    marginBottom: 16,
  },
  detailValue: {
    fontSize: 14,
  },
  noContentBox: {
    padding: '25px 0',
  },
  noContentText: {
    fontSize: 16,
    color: '#7F7F7F',
    paddingBottom: 16,
  },
  // addEdit section
  addEditTitle: {
    padding: '16px 24px 24px 24px',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  cancelButton: {
    border: 'solid 1px #546471',
    color: '#546471',
    padding: '7px 7px',
    marginRight: 16,
  },
  saveButton: {
    backgroundColor: '#546471',
    color: '#ffffff',
    padding: '8px 19px',
    '&:hover': {
      backgroundColor: '#546471',
      color: '#ffffff',
    },
  },
  formControlMargin: {
    marginTop: 15,
    padding: '0px 4px',
  },
  dialogActionSection: {
    padding: 24,
  },
  checkBoxStyle: {
    marginLeft: 0,
    paddingTop: 25,
    color: '#7f7f7f',
  },
  // delete section
  deleteTitle: {
    fontSize: 24,
  },
  deleteButton: {
    backgroundColor: '#E34050',
    color: '#ffffff',
    padding: '8px 19px',
    '&:hover': {
      backgroundColor: '#E34050',
      color: '#ffffff',
    },
  },
  //
  titleBox: {
    padding: '10px 17px',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
