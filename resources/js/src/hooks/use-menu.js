import { useEffect, useState, useRef } from 'react';
import { form } from '@global-states';

export const useMenu = (stylesObject) => {
  const [fieldPosition, updateFieldPosition] = useState(1);
  const isFirstRender = useRef(true);
  const menuRef = useRef(null);

  useEffect(
    () => (!form.selectedField ? resetCoordinates() : setCoordinates()),
    [form.selectedField?.uniqueId],
  );

  const resetCoordinates = () => {
    menuRef.current.style.marginTop = '0';
    if (!isFirstRender.current) {
      performMoveAnimation('up');
    } else {
      isFirstRender.current = false;
    }
  };

  const setCoordinates = () => {
    const { uniqueId } = form.selectedField;
    const { position } = form.fieldsList.find(uniqueId);

    const selector = '.new-form__field_selected';
    const fieldBlock = document.querySelector(selector);
    menuRef.current.style.marginTop = `${fieldBlock.offsetTop}px`;

    if (fieldPosition > position) {
      performMoveAnimation('up');
    } else {
      performMoveAnimation('down');
    }
    updateFieldPosition(position);
  };

  const performMoveAnimation = (direction = 'up') => {
    const directionClass = stylesObject[`menu_moving-${direction}`];
    menuRef.current.classList.add(directionClass);
    setTimeout(() => {
      menuRef.current.classList.remove(directionClass);
    }, 500);
  };

  return { menuRef };
};
