import { YearDateI } from 'components/house/houseDetail/common/ScheduleDatePicker/ScheduleDatePicker';

interface checkedArrI extends YearDateI {
  checked: boolean;
  value: string | number;
}

export const getArrByLenght = (length: number) =>
  Array.from({ length }, (_, i) => (i + 1).toString());

export const setCheckbox = (
  value: any,
  setDates: (any: any[]) => void,
  dates: string[] | any[] | any
) => {
  const changeddArr = dates.map((date: any) => {
    if (date.value === value) {
      return {
        ...date,
        checked: !date.checked,
      };
    }
    return date;
  });
  setDates(changeddArr);
};

export const getCheckedLenght = (dates: any[]) =>
  dates.filter((date) => !!date.checked).length;

export const weekDays = [
  {
    label: 'S',
    value: 'sunday',
    checked: false,
  },
  {
    label: 'M',
    value: 'monday',
    checked: false,
  },
  {
    label: 'T',
    value: 'tuesday',
    checked: false,
  },
  {
    label: 'W',
    value: 'wednesday',
    checked: false,
  },
  {
    label: 'T',
    value: 'thursday',
    checked: false,
  },
  {
    label: 'F',
    value: 'friday',
    checked: false,
  },
  {
    label: 'S',
    value: 'saturday',
    checked: false,
  },
];

export const MountDays = getArrByLenght(31).map((id) => ({
  value: id,
  checked: false,
}));

export const Months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const MonthForState = Months.map((month) => ({
  day: '',
  month,
  checked: false,
}));

export const addCheckedToDefaultFiled = (
  arr: checkedArrI[] | YearDateI[] | any,
  defaultArr: string[] | YearDateI[] | any
) => {
  if (defaultArr.length) {
    return arr.map((date: checkedArrI) => {
      const value = date.month || date.value;

      for (let i = 0; i < defaultArr.length; i++) {
        const compareValue = defaultArr[i]!.month || defaultArr[i];
        const arrItem =
          typeof defaultArr[i] === 'string' ? date : defaultArr[i];
        if (value === compareValue) {
          return {
            ...arrItem,
            checked: true,
          };
        }
      }
      return date;
    });
  } else {
    return arr;
  }
};
