import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  // category section
  categorySection: {
    paddingLeft: 24,
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
  // activeDivider: {
  //   backgroundColor: '#FF4081',
  // },
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
    paddingRight: 24,
    cursor: 'pointer',
  },
  // searchSection: {
  //   marginLeft: 'auto',
  //   marginTop: -16
  // },
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
  // tableTitle: {
  //   fontSize: 12,
  //   color: '#5F5F5F',
  //   padding: '5px 16px',
  //   borderRight: '1px solid #E0E0E0',
  //   borderTop: '1px solid #E0E0E0',
  //   cursor: 'pointer',
  // },
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
  formControlMargin: {},
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
  formControlRoot: {
    width: 262,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  cardSection: {
    margin: 25,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    padding: '25px 25px 13px 25px',
  },
  filterSection: {
    padding: '28px 25px',
    display: 'flex',
  },
  greyColor: {
    color: '#7F7F7F',
  },
  marginLeft50: {
    marginLeft: 50,
  },
  selectTypeSection: {
    display: 'flex',
  },
  marginLeftAuto: {
    marginLeft: 'auto',
  },
  typeStyle: {
    padding: '10px 16px',
    borderRadius: 5,
    marginLeft: 30,
    cursor: 'pointer',
  },
  activeTypeStyle: {
    background: '#F3F3F3',
    fontWeight: 'bold',
  },
  marginLeft0: {
    marginLeft: 0,
  },
  searchSection: {
    marginLeft: 'auto',
    marginRight: 32,
  },
  addIcon: {
    fontSize: 40,
    color: '#556471',
    marginLeft: 13,
  },
  addDocumentText: {
    fontSize: 16,
    color: '#556471',
  },
  countShowResults: {
    color: '#7F7F7F',
    fontSize: 14,
  },
  downloadText: {
    color: '#FF4081',
    cursor: 'pointer',
  },
  // table section
  // documentTypeStyle: {
  //   fontSize: 6,
  //   width: 19,
  //   color: 'white',
  //   marginTop: -16,
  //   marginLeft: -2,
  //   backgroundColor: '#E91E63',
  // },
  // png: {
  //   backgroundColor: '#F68A1E',
  // },
  // txt: {
  //   backgroundColor: '#7FBA00',
  // },
  // pdf: {
  //   backgroundColor: '#007ACC',
  // },
  // doc: {
  //   backgroundColor: '#FC4438',
  // },
  tableTitle: {
    fontSize: 12,
    color: '#5F5F5F',
    padding: '5px 16px',
    borderRight: '1px solid #E0E0E0',
    borderTop: '1px solid #E0E0E0',
    cursor: 'pointer',
  },
  // tableCell: {
  //   padding: '8px 16px',
  // },
  // addEdit section
  // divider: {
  //   backgroundColor: '#FFFFFF',
  //   height: 4,
  //   marginBottom: 27,
  // },
  activeDivider: {
    backgroundColor: '#FF4081',
  },
  // category: {
  //   color: '#FF4081',
  // },
  addEditTitle: {
    padding: '16px 24px',
    fontSize: 24,
  },
}));

export default useStyles;
