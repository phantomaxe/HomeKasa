import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  tableCell: {
    padding: '8px 16px',
  },
  // addEdit section
  divider: {
    backgroundColor: '#FFFFFF',
    height: 4,
    marginBottom: 27,
  },
  activeDivider: {
    backgroundColor: '#FF4081',
  },
  category: {
    color: '#FF4081',
  },
  addEditTitle: {
    padding: '16px 24px',
    fontSize: 24,
  },
  addEditCategory: {
    paddingRight: 24,
    cursor: 'pointer',
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
