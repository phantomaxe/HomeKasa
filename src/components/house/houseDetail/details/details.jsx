import React, { useState } from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './styles';
import Mortgage from './mortgage/mortgage.jsx';
import Insurance from './insurance/insurance.jsx';
import Tax from './tax/tax.jsx';
import Lease from './lease/lease.jsx';

const Details = (props) => {
  const { house } = props;
  const classes = useStyles();

  // set the selected category of mortage, lease and so on
  const category = [
    { name: 'Mortgage', component: <Mortgage house={house} /> },
    { name: 'Taxes', component: <Tax house={house} /> },
    { name: 'Lease', component: <Lease house={house} /> },
    { name: 'Insurance', component: <Insurance house={house} /> },
  ];

  // handle seledted category
  const [selectCategory, setSelectCategory] = useState('Mortgage');
  const selectedCategory = (category) => {
    setSelectCategory(category);
  };

  return (
    <Box>
      <Box display="flex" className={classes.categorySection}>
        {category.map((value, index) => (
          <Box
            key={value.name}
            className={clsx(
              { [classes.categoryBox]: true },
              { [classes.activeCategoryBox]: selectCategory === value.name }
            )}
            onClick={() => selectedCategory(value.name)}
          >
            <Typography
              className={clsx(
                { [classes.category]: true },
                { [classes.activeCategory]: selectCategory === value.name }
              )}
            >
              {value.name}
            </Typography>
            <Divider
              className={clsx(
                { [classes.divider]: true },
                { [classes.activeDivider]: selectCategory === value.name }
              )}
            />
          </Box>
        ))}
      </Box>
      <Divider />
      {category.map((value, index) => (
        <Box
          key={value.name}
          display={selectCategory === value.name ? '' : 'none'}
        >
          {value.component}
        </Box>
      ))}
    </Box>
  );
};

export default Details;
