import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background: '#FAFAFA',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: 60
  },
  copyRightWrapper: {
    position: 'absolute',
    bottom: 25,
    width: '100%'
  },
  copyRight: {
    fontSize: 14,
    color: '#B2B2B2'
  },
  logoSection: {
    height: 176,
    background: '#556471',
    textAlign: 'left',
    display: 'flex',
    paddingLeft: 40,
    alignItems: 'center'
  },
  contentSection: {
    padding: 80,
    background: '#ffffff',
    borderRadius: 5,
    boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    textAlign: 'center'
  },
  contentWrapper: {
    textAlign: 'left',
    marginTop: -59,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 545,
    zIndex: 10,
  },
  contentType: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 3
  },
  contentTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  saveButton: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FF4081',
    color: '#ffffff',
    padding: 13,
    '&:hover': {
      backgroundColor: '#FF4081',
      color: '#ffffff',
    },
  },
  serverErrorStyle: {
    color: '#ED372E',
    marginTop: 30,
    fontSize: 20
  }
}));

export default useStyles;
