import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // category section
  categorySection: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  categoryBox: {
    cursor: 'pointer',
    borderRadius: '3px 3px 0 0',
  },
  activeCategoryBox: {
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
  activeAddEditCategory: {
    fontWeight: 'bold',
  },
  searchSection: {
    marginLeft: 'auto',
    marginTop: -16,
  },
  searchSectionInput: {
    background: '#F4F4F5',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  searchSectionNotchedOutline: {
    border: 'none',
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
    height: 40,
  },
  tableTitle: {
    fontSize: 13,
    color: '#5F5F5F',
    fontWeight: 500,
    padding: '5px 17px',
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0',
    cursor: 'pointer',
  },
  tableCell: {
    padding: '8px 17px',
  },
  tableFirstCell: {
    borderRight: '1px solid #E0E0E0',
  },
  sortIconStyle: {
    fontSize: 22,
    color: '#000',
    marginLeft: '8px',
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
  dialogContentSection: {
    paddingTop: 0,
  },
  cancelButton: {
    border: 'solid 1px #FF4081',
    color: '#FF4081',
    padding: '7px 7px',
    marginRight: 16,
  },
  saveButton: {
    backgroundColor: '#FF4081',
    color: '#ffffff',
    padding: '8px 19px',
    '&:hover': {
      backgroundColor: '#FF4081',
      color: '#ffffff',
    },
  },
  formControlMargin: {
    marginTop: 15,
    padding: '0px 4px',
  },
  formControlTop20: {
    top: '20px',
  },
  dialogActionSection: {
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
  // New
  titleBox: {
    padding: '10px 17px',
    display: 'flex',
    alignItems: 'center',
  },
  uploadReceiptLabel: {
    fontSize: 16,
    color: '#FF4081',
  },
  uploadButtonBox: {
    background: '#ECECEC',
    padding: '10px 12px',
    borderRadius: '50%',
    boxShadow: ' 0 4px 4px #BFBFBF',
    marginLeft: 24,
    display: 'inline-block',
    cursor: 'pointer',
  },
  hideFileInput: {
    display: 'none',
  },
  fileUplaodSection: {
    alignItems: 'center',
    display: 'flex',
    marginTop: 25,
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  selectTypeInput: {
    width: '100%',
  },
  // add picture section
  dragDropBox: {
    height: 182,
    borderRadius: 12,
    border: '1px dashed #556471',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPictureText: {
    fontSize: 18,
    color: '#FF4081',
    marginTop: 20,
  },
  dropzoneContainer: {
    minHeight: 'auto',
  },
}));

export default useStyles;
