import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  categorySection: {
    paddingLeft: 17,
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
}));

export default useStyles;
