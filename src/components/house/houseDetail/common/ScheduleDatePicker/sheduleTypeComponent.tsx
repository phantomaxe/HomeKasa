import React from 'react';
import {
  FrequencyEnum,
  SheduleFormI,
} from 'components/house/houseDetail/common/ScheduleDatePicker/ScheduleDatePicker';
import { useFormContext } from 'react-hook-form';
import { SheduleFrequencyWeek } from 'components/house/houseDetail/common/ScheduleDatePicker/SheduleFrequency/Week';
import { SheduleFrequencyMonth } from 'components/house/houseDetail/common/ScheduleDatePicker/SheduleFrequency/Month';
import { SheduleFrequencyYear } from 'components/house/houseDetail/common/ScheduleDatePicker/SheduleFrequency/Year';

interface Props {
  setDates: any;
  dates: any;
}

export const SheduleTypeComponent = ({ setDates, dates }: Props) => {
  const { watch } = useFormContext<SheduleFormI>();

  const frequency = watch('frequency');

  switch (frequency) {
    case FrequencyEnum.WEEK:
      return <SheduleFrequencyWeek setDates={setDates} dates={dates} />;
    case FrequencyEnum.MONTH:
      return <SheduleFrequencyMonth setDates={setDates} dates={dates} />;
    case FrequencyEnum.YEAR:
      return <SheduleFrequencyYear setDates={setDates} dates={dates} />;
    default:
      break;
  }
  return null;
};
