import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
  cancelButton: {
    border: 'solid 1px #546471',
    color: '#546471',
    padding: '7px 7px',
    marginRight: 16,
  },
}));

export default useStyles;
