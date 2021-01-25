import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardWrapper: {
    padding: 20,
  },
  cardContent: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    height: 420,
    margin: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
  },
  interestButton: {
    backgroundColor: '#546471',
    color: '#ffffff',
    fontSize: 12,
    marginTop: 25,
    '&:hover': {
      backgroundColor: '#546471',
    },
    height: 33,
  },
  imageStyle: {
    width: 300,
    height: 230,
  },
}));

export default useStyles;
