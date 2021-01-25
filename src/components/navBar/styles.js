import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 104;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#FF4081',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 8,
      background: '#F1F1F1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#C0C0C0',
      borderRadius: 4,
    },
  },
  paperAnchorDockedLeft: {
    border: 'none',
  },
  logoSection: {
    padding: 20,
    background: '#556471',
    marginBottom: 32,
  },
  listItemStyle: {
    justifyContent: 'center',
    display: 'block',
    textAlign: 'center',
    padding: '13px 0',
    '&:hover': {
      background: '#FF5B93',
    },
  },
  listItemText: {
    fontSize: 12,
    color: '#ffffff',
    paddingTop: 3,
  },
  activeItem: {
    background: '#DD195C',
  },
  flexColBetween: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  badge: {
    top: 10,
    right: 6,
    background: '#5BA71B',
    border: '2px solid #ffffff',
    height: 15,
    minWidth: 15,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 8,
    padding: 0,
  },
  bottomIcon: {
    fontSize: 30,
    color: '#ffffff',
  },
}));

export default useStyles;
