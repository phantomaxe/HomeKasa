import { useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Checkbox } from '@material-ui/core';
import { useSheduleDatePickerStyles } from 'components/house/houseDetail/common/ScheduleDatePicker/useStyles';
import { SheduleFormI } from 'components/house/houseDetail/common/ScheduleDatePicker/ScheduleDatePicker';
import {
  weekDays,
  setCheckbox,
  getCheckedLenght,
} from 'components/house/houseDetail/common/ScheduleDatePicker/helpers';

interface Props {
  setDates: (a: any) => void;
  dates: any[];
}

export const SheduleFrequencyWeek = ({ dates, setDates }: Props) => {
  const classes = useSheduleDatePickerStyles();

  const { watch } = useFormContext<SheduleFormI>();

  const { repeats } = watch(['repeats']);

  const checkedLenght = getCheckedLenght(dates);

  useEffect(() => {
    if (repeats === 7) {
      setDates(weekDays.map((date) => ({ ...date, checked: true })));
    } else if (repeats! < checkedLenght) {
      setDates(weekDays);
    }
  }, [repeats, setDates, checkedLenght]);

  return (
    <>
      {dates.map(({ label, value, checked }: any) => (
        <Checkbox
          key={value}
          value={value}
          checked={checked}
          icon={<span>{label}</span>}
          checkedIcon={<span className={classes.checkBoxIcon}>{label}</span>}
          classes={{
            root: classes.checkBoxRoot,
            checked: classes.checkBoxChecked,
            disabled: classes.checkBoxDisabled,
          }}
          onChange={(e) => setCheckbox(e.target.value, setDates, dates)}
          disabled={checkedLenght >= repeats! && !checked}
        />
      ))}
    </>
  );
};
