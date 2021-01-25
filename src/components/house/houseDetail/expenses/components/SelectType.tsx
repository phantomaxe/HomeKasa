import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AddTypeSelect from '../addTypeSelect';
import { MenuItem } from '@material-ui/core';
// import Axios from 'axios';
// import API from '../../../../../utils/api';

interface Props {
  subType: string;
  expense: any;
  onEditSuccess: any;
}

export const SelectType = ({subType, expense, onEditSuccess, ...props}:Props) => {
  
  const { control, setValue  } = useForm();

  useEffect(() => {
    setValue('subType', subType )
  }, [setValue, subType]);

  // const {subType:localsubType} = watch();

  // TODO: this useEffect doesn't work correctly. Fix it
  // useEffect(() => {
  //   if(localsubType && localsubType !== 'addtype' && localsubType !== subType){
  //     const updateExpense = async () =>{
  //       try {
  //       const sendEditData = new FormData();
  //       sendEditData.append('subType', localsubType);
  //
  //       const response = await Axios.put(API.EditExpense + expense._id, sendEditData)
  //       const localResponse = response.data.data
  //
  //       onEditSuccess((expenses:any) =>{
  //         return expenses.map((expense:any) =>{
  //           if(expense._id === localResponse._id){
  //             return {
  //               ...expense,
  //               subType:localsubType
  //             }
  //           }
  //           return expense
  //         })
  //       })
  //       } catch (e) {}
  //     }
  //     updateExpense()
  //   }
  // }, [localsubType, onEditSuccess, subType]);

  return (
    <Controller
      as={
        <AddTypeSelect title="Add Type" {...props}>
          <MenuItem value="repair">Repair</MenuItem>
          <MenuItem value="hoa">HOA</MenuItem>
          <MenuItem value="utilites">Utilites</MenuItem>
          <MenuItem value="gardening">Gardening</MenuItem>
        </AddTypeSelect>
      }
      name="subType"
      defaultValue={subType}
      control={control}
    />
  );
};
