import { useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Checkbox } from '@material-ui/core';
import { useSheduleDatePickerStyles } from 'components/house/houseDetail/common/ScheduleDatePicker/useStyles';
import { SheduleFormI } from 'components/house/houseDetail/common/ScheduleDatePicker/ScheduleDatePicker';
import {
  MountDays,
  setCheckbox,
  getCheckedLenght,
  // addCheckedToDefaultFiled,
} from 'components/house/houseDetail/common/ScheduleDatePicker/helpers';

interface Props {
  setDates: (a: any) => void;
  dates: any[];
}

export const SheduleFrequencyMonth = ({ dates, setDates }: Props) => {
  const classes = useSheduleDatePickerStyles();

  const { watch } = useFormContext<SheduleFormI>();

  const { repeats } = watch(['repeats']);

  const checkedLenght = getCheckedLenght(dates);

  useEffect(() => {
    if (repeats === 31) {
      setDates(MountDays.map((date) => ({ ...date, checked: true })));
    } else if (repeats! < checkedLenght) {
      setDates(MountDays);
    }
  }, [repeats, setDates, checkedLenght]);

  return (
    <>
      {dates.map(({ value, checked }) => (
        <Checkbox
          key={value}
          value={value}
          checked={checked}
          icon={<span>{value}</span>}
          checkedIcon={<span className={classes.checkBoxIcon}>{value}</span>}
          classes={{
            root: classes.checkBoxRoot,
            checked: classes.checkBoxChecked,
            disabled: classes.checkBoxDisabled,
          }}
          onChange={(e) => setCheckbox(e.target.value, setDates, dates)}
          disabled={!checked && checkedLenght >= repeats!}
        />
      ))}
    </>
  );
};
