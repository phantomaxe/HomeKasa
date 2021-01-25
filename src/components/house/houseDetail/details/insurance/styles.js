import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // body section
  totalSection: {
    padding: '13px 17px',
    alignItems: 'center',
  },
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
    height: 40,
  },
  sortIconStyle: {
    fontSize: 12,
  },
  collapesSection: {
    padding: 0,
  },
  tableTitle: {
    fontSize: 12,
    color: '#5F5F5F',
    padding: '5px 17px',
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0',
    cursor: 'pointer',
  },
  tableCell: {
    padding: '8px 17px',
  },
  menuIcon: {
    marginRight: 8,
  },
  detail: {
    padding: '25px 17px',
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
  categorySection: {
    paddingLeft: 24,
  },
  addEditCategory: {
    cursor: 'pointer',
    borderRadius: '3px 3px 0 0',
  },
  activeAddEditCategory: {
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
    fontSize: 12,
    color: '#FF4081',
  },
  activeCategory: {
    fontWeight: 'bold',
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
  dialogActionStyle: {
    padding: 24,
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
}));

export default useStyles;
