const blue = '#EBEFF2';
const homekasaPrimaryBlue = '#3C6AA6';

const primaryCTA = homekasaPrimaryBlue;

const useStyles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(5),
    backgroundColor: blue,
    margin: '15px',
  },
  image: {
    width: '100%',
    height: '200px',
  },
  errorText: {
    color: 'red',
    font: 'Roboto',
    fontSize: '1em',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  title: {
    fontSize: '40px',
    textAlign: 'center',
  },
  Grid: {
    padding: '20px',
  },
  PrimaryButton: {
    backgroundColor: primaryCTA,
  },
  houseImage: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  // definitions for column headers and column detail - SFDC style
  tableRow: {
    // borderBottom: '1px solid',
    margin: '5px',
  },
  columnHeader: {
    color: 'black',
    display: 'inline',
    marginRight: '10px',
    fontSize: '0.75em',
    textAlign: 'left',
  },
  columnDetail: {
    color: 'black',
    textAlign: 'left',
  },
};

export default useStyles;
