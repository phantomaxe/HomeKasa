import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
    fontSize: 16,
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
  formCountrySection: {
    marginTop: 16,
    marginBottom: 4,
  },
  countrySection: {
    display: 'flex',
    alignItems: 'center',
  },
  countryTitle: {
    color: 'grey',
    paddingBottom: 4,
    marginRight: 5,
  },
  formSelectStyle: {
    marginBottom: 6,
  },
  dialogActions: {
    padding: 24,
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '100vh',
    minWidth: '80vh',
    maxWidth: '100vh',
  },
}));

export default useStyles;
