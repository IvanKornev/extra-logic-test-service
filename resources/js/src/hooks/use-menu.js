import { useEffect, useState } from 'react';
import { form } from '@global-states';

export const useMenu = (stylesObject) => {
  const [classes, setClasses] = useState([stylesObject.menu]);
  const [fieldPosition, updateFieldPosition] = useState(1);
  const [pixelShift, setPixelShift] = useState('0');

  useEffect(() => ((!form.selectedField) ? resetCoordinates() : setCoordinates()), [form.selectedField?.uniqueId]);

  const resetCoordinates = () => {
    setPixelShift('0');
    performMoveAnimation('up');
  };

  const setCoordinates = () => {
    const { uniqueId } = form.selectedField;
    const { position } = form.fieldsList.find(uniqueId);
    const fieldBlockSize = 135;
    setPixelShift(`${fieldBlockSize * position}px`);

    if (fieldPosition > position) {
      performMoveAnimation('up')
    } else {
      performMoveAnimation('down');
    }
    updateFieldPosition(position);
  };

  const performMoveAnimation = (direction = 'up') => {
    const directionClass = `menu_moving-${direction}`;
    setClasses((updatingClasses) => (
      [...updatingClasses, stylesObject[directionClass]]
    ));
    setTimeout(() => {
      setClasses((updatingClasses) => {
        updatingClasses.pop();
        return updatingClasses;
      });
    }, 500);
  };

  return { pixelShift, classes };
};
