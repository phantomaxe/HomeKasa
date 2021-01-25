import React, { useState, useEffect } from 'react';
import { useSheduleDatePickerStyles } from 'components/house/houseDetail/common/ScheduleDatePicker/useStyles';
import { MenuItem, Select, Grid, Box } from '@material-ui/core';
import { useForm, Controller, FormContext } from 'react-hook-form';
import { SheduleTypeComponent } from 'components/house/houseDetail/common/ScheduleDatePicker/sheduleTypeComponent';
import {
  addCheckedToDefaultFiled,
  getArrByLenght,
  MonthForState,
  MountDays,
  weekDays,
} from 'components/house/houseDetail/common/ScheduleDatePicker/helpers';

import moment from 'moment';
import { Expense } from 'utils/types/Expenses';
import { SheduleStartEndDate } from 'components/house/houseDetail/common/ScheduleDatePicker/ScheduleStartEndDate';
// import { SheduleStartEndDate } from 'components/house/houseDetail/common/ScheduleDatePicker/SheduleStartEndDate';

export enum FrequencyEnum {
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year',
}

export interface YearDateI {
  day?: string;
  month?: string;
}

export interface SheduleFormI {
  frequency: FrequencyEnum;
  repeats: string | number;
  repeatsByfrequency: number;
  endDate: string;
  lastName1: string;
  startDate: string;
}

interface Props {
  expense: Expense;
  handleChange: Function;
  handleEventChange: (event: any) => void;
  errors: any;
  defaultDateSchedule: {
    dates: string[] | YearDateI[];
    frequency: FrequencyEnum;
    repeats: number;
  };
}

export const ScheduleDatePicker = ({
  expense,
  defaultDateSchedule,
  handleChange,
  handleEventChange,
  errors,
}: Props) => {
  const classes = useSheduleDatePickerStyles();

  const {
    dates: defaultDates = [],
    frequency: defaultFrequency = FrequencyEnum.WEEK,
    repeats: defaultRepeats = 7,
  } = defaultDateSchedule;

  const [dates, setDates] = useState<any>(defaultDates);

  const methods = useForm<SheduleFormI>({
    defaultValues: {
      frequency: defaultFrequency,
      repeats: defaultRepeats,
      repeatsByfrequency: 7,
      endDate: expense.endDate
        ? moment(expense.endDate).format('YYYY-MM-DD')
        : '',
      startDate: expense.startDate
        ? moment(expense.startDate).format('YYYY-MM-DD')
        : '',
    },
  });

  const { control, watch, setValue, register } = methods;

  const { frequency, repeatsByfrequency } = watch();
  const fields = watch();

  useEffect(() => {
    register({ name: 'repeatsByfrequency' });
  }, [register]);

  useEffect(() => {
    if (frequency === defaultFrequency) {
      setValue('repeats', defaultRepeats);
    } else {
      setValue('repeats', 1);
    }

    switch (frequency) {
      case FrequencyEnum.WEEK:
        setDates(addCheckedToDefaultFiled(weekDays, defaultDates));
        setValue('repeatsByfrequency', 7);
        break;
      case FrequencyEnum.MONTH:
        setDates(addCheckedToDefaultFiled(MountDays, defaultDates));
        setValue('repeatsByfrequency', 31);
        break;
      case FrequencyEnum.YEAR:
        setDates(addCheckedToDefaultFiled(MonthForState, defaultDates));
        setValue('repeatsByfrequency', 12);
        break;

      default:
        break;
    }
  }, [frequency, setValue]);

  // FOR SHOW
  useEffect(() => {
    const readyData = { ...fields };
    if (readyData.repeatsByfrequency) {
      // @ts-ignore
      delete readyData.repeatsByfrequency;
    }
    let localDates = [];

    localDates = dates.filter((date: any) => date.checked);

    if ([FrequencyEnum.WEEK, FrequencyEnum.MONTH].includes(frequency)) {
      localDates = localDates.map((date: any) => date.value);
    } else {
      localDates = localDates.map(({ day, month }: any) => ({ day, month }));
    }

    // console.log({
    //   ...readyData,
    //   dates: localDates,
    //   frequency: readyData.frequency,
    // });
    handleChange({
      ...readyData,
      dates: localDates,
    });
  }, [fields, dates, frequency]);

  return (
    <FormContext {...methods}>
      <Grid container>
        <Grid item xs={6}>
          Repeats
          <Controller
            as={
              <Select
                className={classes.selectRepeatValue}
                MenuProps={{
                  PaperProps: {
                    className: classes.selectMenuItem,
                  },
                }}
              >
                {getArrByLenght(repeatsByfrequency).map((i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            }
            rules={{
              required: true,
            }}
            name="repeats"
            control={control}
          />
          Times
        </Grid>
        <Grid justify="center" alignItems="center" container xs={6}>
          Every
          <Controller
            as={
              <Select
                className={classes.selectRepeatType}
                defaultValue={FrequencyEnum.WEEK}
              >
                <MenuItem value={FrequencyEnum.WEEK}>
                  {FrequencyEnum.WEEK}
                </MenuItem>
                <MenuItem value={FrequencyEnum.MONTH}>
                  {FrequencyEnum.MONTH}
                </MenuItem>
                <MenuItem value={FrequencyEnum.YEAR}>
                  {FrequencyEnum.YEAR}
                </MenuItem>
              </Select>
            }
            name="frequency"
            control={control}
          />
        </Grid>
        <Grid container xs={12}>
          <Box mt={4} mr={4} mb={3}>
            <Grid container wrap="nowrap">
              <Grid>
                <Box pr={2}>On</Box>
              </Grid>
              <Grid>
                <SheduleTypeComponent setDates={setDates} dates={dates} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <SheduleStartEndDate
          expense={expense}
          handleEventChange={handleEventChange}
          errors={errors}
        />
      </Grid>
    </FormContext>
  );
};
