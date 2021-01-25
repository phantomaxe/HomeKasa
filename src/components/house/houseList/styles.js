import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 360,
    boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.05)',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#DDDDDD',
      borderRadius: 4,
    },
  },
  header: {
    padding: '16px 24px',
  },
  headerTitle: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
  },
  addIcon: {
    fontSize: 40,
    color: '#556471',
    marginLeft: 'auto',
  },
  addHouseText: {
    fontSize: 16,
    color: '#556471',
  },
  fullWidth: {
    width: '100%',
  },
  houseListItem: {
    height: 140,
    padding: 18,
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'start',
  },
  clickedHouse: {
    backgroundColor: '#E5E7E8',
  },
  houseListImage: {
    width: 150,
    height: 104,
    borderRadius: 10,
    marginRight: 15,
  },
  clickSection: {
    width: '100%',
    display: 'flex',
  },
  houseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    width: 145,
    whiteSpace: 'nowrap',
    height: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  favoriteIcon: {
    fontSize: 16,
    '&: hover': {
      backgroundColor: 'grey',
    },
  },
  houseAddress: {
    width: 110,
    whiteSpace: 'nowrap',
    fontSize: 12,
    height: 15,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  countryFlag: {
    width: '30px !important',
    height: '20px !important',
    marginRight: 5,
  },
  houseState: {
    paddingTop: 16,
    fontSize: 12,
    color: '#556471',
  },
  addButton: {
    backgroundColor: '#546471',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#546471',
    },
  },
  noHouseText: {
    fontSize: 16,
    color: '#7F7F7F',
    padding: '17px 0 27px',
  },
  noHouseBox: {
    paddingTop: 63,
  },
  addHouseBanner: {
    '& .MuiSnackbarContent-root': {
      width: '95vw',
      backgroundColor: '#444444',
    },
    '& .MuiSnackbarContent-root.MuiSnackbarContent-message': {
      padding: 0,
    },
  },
  addBannerMessage: {
    marginLeft: 16,
    color: '#AAB1B8',
  },
  addBannerVirtical: {
    width: 2,
    background: '#AAB1B8',
    marginLeft: 16,
  },
  checkIcon: {
    color: '#13C610',
  },
}));

export default useStyles;
