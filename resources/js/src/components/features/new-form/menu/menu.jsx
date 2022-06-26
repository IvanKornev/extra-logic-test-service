import React, { useId, useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';
import { newForm } from '@domains';

import styles from './menu.module.scss';
import { Box, Tooltip } from '@mui/material';

const NewFormMenu = observer(
  forwardRef((props, creatorRef) => {
    const { onlyAddOption } = props;

    const [pixelShift, setPixelShift] = useState('0');
    const [classes, setClasses] = useState([styles['menu']]);
    const [fieldPosition, updateFieldPosition] = useState(1);
    useEffect(() => {
      if (!form.selectedField) {
        setPixelShift('0');
        move('up');
      } else {
        const { uniqueId } = form.selectedField;
        const { position } = form.fieldsList.find(uniqueId);
        const fieldBlockSize = 135;
        setPixelShift(`${fieldBlockSize * position}px`);

        fieldPosition > position ? move('up') : move('down');
        updateFieldPosition(position);
      }
    }, [form.selectedField?.uniqueId]);

    const move = (direction = 'up') => {
      const directionClass = `menu_moving-${direction}`;
      setClasses((classes) => [...classes, styles[directionClass]]);
      setTimeout(() => {
        setClasses((classes) => {
          classes.pop();
          return classes;
        });
      }, 500);
    };

    const menu = newForm.createMenu(creatorRef);
    return (
      <Box sx={{ marginTop: pixelShift }} className={classes.join(' ')}>
        {menu.map((item) => {
          const { iconName, action, tooltip } = item;
          const id = useId();
          const IconComponent = iconName;
          const isDisable = onlyAddOption && action.name !== 'add';

          const classSuffix = isDisable ? 'disabled' : 'enabled';
          const itemClass = styles[`menu__item_${classSuffix}`];
          const iconClass = styles['menu__icon'];
          return (
            <Tooltip key={id} title={tooltip} placement='right'>
              <>
                <IconComponent
                  size={30}
                  id={`menu__icon_${action.name}`}
                  color='#545454'
                  onClick={action.callback}
                  className={`${itemClass} ${iconClass}`}
                />
              </>
            </Tooltip>
          );
        })}
      </Box>
    );
  }),
);

NewFormMenu.defaultTypes = {
  onlyAddOptions: false,
};

NewFormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
};

export { NewFormMenu };
