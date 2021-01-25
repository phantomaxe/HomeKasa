import { makeStyles } from '@material-ui/core/styles';

export const useSheduleDatePickerStyles = makeStyles(() => ({
  formControlMargin: {
    marginTop: 15,
    padding: '0px 4px',
  },
  formControlMarginLeft: {
    paddingRight: 32,
  },
  selectRepeatValue: {
    width: '50px',
    marginLeft: '11px',
    marginRight: '14px',
  },
  selectRepeatType: {
    width: '100px',
    marginLeft: '11px',
    // textTransform: 'capitalize',
  },
  checkBoxRoot: {
    marginTop: '5px',
    width: '28px',
    height: '28px',
    fontSize: '16px',
    color: '#000',
    background: '#F5F5F5',
    marginRight: '8px',
    borderRadius: '5px',
  },
  checkBoxYearRoot: {
    width: 'auto',
    height: '28px',
  },
  checkBoxChecked: {
    background: '#FF4081',
  },
  checkBoxIcon: {
    color: '#fff',

    'input:hover ~ &': {
      color: '#000',
    },
  },
  checkBoxDisabled: {
    color: '#000',
    opacity: '0.5',
  },
  selectMenuItem: {
    height: '270px',
  },
}));
