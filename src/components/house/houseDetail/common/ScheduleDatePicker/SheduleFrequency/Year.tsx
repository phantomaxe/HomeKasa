import { useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@material-ui/core';
import { useSheduleDatePickerStyles } from 'components/house/houseDetail/common/ScheduleDatePicker/useStyles';
import { SheduleFormI } from 'components/house/houseDetail/common/ScheduleDatePicker/ScheduleDatePicker';
import {
  Months,
  MonthForState,
} from 'components/house/houseDetail/common/ScheduleDatePicker/helpers';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

interface Props {
  setDates: (a: any) => void;
  dates: any[];
}

export const SheduleFrequencyYear = ({ setDates, dates }: Props) => {
  const classes = useSheduleDatePickerStyles();

  const { watch } = useFormContext<SheduleFormI>();

  const { repeats } = watch(['repeats']);

  const onSelectDate = (date: MaterialUiPickersDate) => {
    const day = moment(date).format('D');
    const month = moment(date).format('M');

    const parsedArr = dates.map((date) => {
      if (date.month === Months[+month - 1]) {
        return {
          day,
          month: Months[+month - 1],
          checked: true,
        };
      }
      return date;
    });

    setDates(parsedArr);
  };

  const onDeleteDate = (month: string) => {
    const parsedArr = dates.map((date) => {
      if (date.month === month) {
        return {
          ...date,
          day: '',
          checked: false,
        };
      }
      return date;
    });

    setDates(parsedArr);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<any>(null);

  useEffect(() => {
    if (selectedMonth !== null) {
      setIsOpen(true);
    }
  }, [selectedMonth]);

  const currentYear = moment().year();

  const checkedDatesLenght = dates.filter((date) => date.day).length;

  useEffect(() => {
    if (repeats! < checkedDatesLenght) {
      setDates(MonthForState);
    }
  }, [repeats, setDates, checkedDatesLenght]);

  return (
    <>
      {dates.map(({ month, day, checked }: any, i) => (
        <Checkbox
          key={month}
          onClick={() => {
            if (checked) {
              onDeleteDate(month);
            } else {
              setSelectedMonth(
                moment(`${currentYear}-${i + 1}`).format('YYYY-MM')
              );
            }
          }}
          checked={day}
          icon={<span>{`${month}`}</span>}
          style={{ textTransform: 'capitalize' }}
          checkedIcon={
            <span className={classes.checkBoxIcon}>{`${day} ${month}`}</span>
          }
          classes={{
            root: `${classes.checkBoxRoot} ${classes.checkBoxYearRoot}`,
            checked: classes.checkBoxChecked,
            disabled: classes.checkBoxDisabled,
          }}
          disabled={!checked && checkedDatesLenght >= repeats!}
        />
      ))}
      <DatePicker
        open={isOpen}
        format="MM-DD"
        openTo="date"
        minDate={moment(selectedMonth).format('YYYY-MM-01')}
        maxDate={moment(selectedMonth).format('YYYY-MM-31')}
        views={['date']}
        disableToolbar
        value={selectedMonth}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onChange={onSelectDate}
        TextFieldComponent={() => null}
      />
    </>
  );
};
