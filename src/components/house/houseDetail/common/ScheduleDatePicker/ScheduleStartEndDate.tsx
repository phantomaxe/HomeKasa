import { FormControl, Grid, TextField } from '@material-ui/core';
import { useSheduleDatePickerStyles } from 'components/house/houseDetail/common/ScheduleDatePicker/useStyles';
import moment from 'moment';
import React from 'react';
import { Expense } from 'utils/types/Expenses';

interface Props {
  expense: Expense;
  errors: any;
  handleEventChange: (event: any) => void;
}

export const SheduleStartEndDate = ({
  handleEventChange,
  expense,
  errors,
}: Props) => {
  const classes = useSheduleDatePickerStyles();
  return (
    <>
      <Grid item xs={6}>
        <FormControl
          fullWidth
          className={`${classes.formControlMargin} ${classes.formControlMarginLeft}`}
        >
          <TextField
            onChange={handleEventChange}
            onBlur={handleEventChange}
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            defaultValue={
              expense.startDate
                ? moment(expense.startDate).format('YYYY-MM-DD')
                : ''
            }
            error={!!errors.startDate}
            helperText={errors.startDate}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth className={classes.formControlMargin}>
          <TextField
            onChange={handleEventChange}
            onBlur={handleEventChange}
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            defaultValue={
              expense.endDate
                ? moment(expense.endDate).format('YYYY-MM-DD')
                : ''
            }
            error={!!errors.endDate}
            helperText={errors.endDate}
          />
        </FormControl>
      </Grid>
    </>
  );
};
