import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 16,
    textAlign: 'left',
    backgroundColor: '#F7F7F7',
    width: '80%',
  },
  houseSummaryCard: {
    padding: 16,
    height: 241,
    display: 'flex',
    marginBottom: 30,
    '& >.MuiBox-root >.css-1dwjdc9 >.css-okyn8a >.css-1f6mae5': {
      backgroundColor: '#ffffff',
      color: '#000000',
      width: 25,
      height: 25,
      fontSize: 13,
      paddingRight: 3,
    },
    '& >.MuiBox-root >.css-1dwjdc9 >.css-okyn8a >.css-14i60ud': {
      backgroundColor: '#ffffff',
      color: '#000000',
      width: 25,
      height: 25,
      fontSize: 13,
      paddingLeft: 3,
    },
  },
  houseImage: {
    height: 209,
    width: 302,
    borderRadius: 10,
    marginRight: 20,
  },
  houseName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  marginLeftAuto: {
    marginLeft: 'auto',
  },
  countryFlag: {
    width: '30px !important',
    height: '20px !important',
    marginRight: 10,
  },
  houseStateSelect: {
    minWidth: 203,
  },
  marginButton16: {
    marginBottom: 16,
  },
  userRelationship: {
    fontSize: 16,
    color: '#7B7B7B',
    marginLeft: 10,
  },
  percent: {
    color: '#5BA71B',
    fontSize: 12,
    paddingLeft: 8,
  },
  pointer: {
    cursor: 'pointer',
    padding: '0 20px',
  },
  divider: {
    backgroundColor: '#FFFFFF',
    height: 6,
    marginBottom: 15,
    borderRadius: '0 0 3px 3px',
  },
  activeDivider: {
    backgroundColor: '#FF4081',
  },
  category: {
    color: '#FF4081',
    marginBottom: 17,
  },
  activeCategory: {
    fontWeight: 'bold',
  },
  menuIcon: {
    marginRight: 8,
  },
  detailCard: {
    marginBottom: 30,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  titleName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleBox: {
    padding: '14px 17px',
    display: 'flex',
  },
  hideShow: {
    color: '#FF4081',
    fontSize: 12,
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  imageSliderStyle: {},
}));

export default useStyles;
