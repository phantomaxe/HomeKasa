import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    width: 262,
  },
  propertiesSectionHouse: {
    fontSize: 24,
    fontWeight: '500',
  },
  tag: {
    fontSize: 12,
    color: 'grey',
    paddingBottom: 15,
  },
  active: {
    color: '#FF4081',
  },
  pointer: {
    cursor: 'pointer',
    paddingLeft: 14,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  action: {
    fontSize: 14,
    color: '#FF4081',
    border: '1px solid #FF4081',
    cursor: 'pointer',
  },
  // select category
  categorySection: {
    paddingLeft: 25,
  },
  categoryBox: {
    cursor: 'pointer',
    borderRadius: '3px 3px 0 0',
  },
  activeCategoryBox: {
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
  /// ///////////////////
  cardSection: {
    margin: 25,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    padding: 25,
  },
  filterSection: {
    padding: '32px 25px',
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
}));

export default useStyles;
