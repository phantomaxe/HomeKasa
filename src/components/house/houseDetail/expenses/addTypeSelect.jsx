import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { Select, MenuItem, Input } from '@material-ui/core';

const refInput = React.createRef();
const propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ]),
};
AddTypeSelect.propTypes = propTypes;
export default function AddTypeSelect(props) {
  const DEFAULT_SUBTYPE = ['repair', 'hoa', 'utilites', 'gardening'];
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(props.value);
  const [open, setOpen] = useState(false);
  // const [selectValue,setSelectValue] = useState();

  useEffect(() => {
    if (editing) {
      refInput.current.children[0].children[0].focus();
    }
  }, [editing, open]);
  // event that click type select
  const handleSelectClick = (e) => {
    // before clicked 'addtype' button
    if (!editing) {
      if (e.target.value === 'addtype') {
        // when clicked addtype button
        setEditing(true);
        setOpen(true);
        return;
      }
    } else {
      // after clicked 'addtype' button
      if (e.target.value === 'addtypetext' || e.target.type === 'text') {
        // text input click event
        setEditing(false);
        setOpen(false);
        return;
      }
      if (e.target.name === 'subType') {
        // select item click event
        setEditing(false);
        setOpen(false);
      } else {
        // when clicked other space
        refInput.current.children[0].children[0].focus();
        setEditing(true);
        setOpen(true);
      }
      return;
    }
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      refInput.current.children[0].children[0].click();
    }
  };
  const { innerRef, ...attributes } = props;
  const elInput = editing ? (
    <MenuItem ref={refInput} value={value}>
      <Input
        value={DEFAULT_SUBTYPE.includes(value) ? '' : value}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
    </MenuItem>
  ) : !DEFAULT_SUBTYPE.includes(value) && value !== '' ? (
    <MenuItem ref={refInput} value={value}>
      {value}
    </MenuItem>
  ) : (
    ''
  );
  return (
    <Select
      onClick={handleSelectClick}
      open={open}
      {...attributes}
      ref={innerRef}
    >
      {props.children}
      {elInput}
      <MenuItem value="addtype">+ {props.title}</MenuItem>
    </Select>
  );
}
