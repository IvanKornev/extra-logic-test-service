import { useEffect, useState, useRef } from 'react';
import { formState } from '@global-states';

export const useMenu = (stylesObject) => {
  const [prevPosition, updatePrevPosition] = useState(1);
  const menuRef = useRef(null);

  useEffect(() => {
    const id = formState.selectedField?.uniqueId;
    const { position } = formState.fieldsList.find(id);
    return changePosition(position);
  }, [formState.selectedField?.uniqueId]);

  const changePosition = (position) => {
    setMarginTop();
    if (prevPosition > position || !position) {
      performMoveAnimation('up');
    } else {
      performMoveAnimation('down');
    }
    updatePrevPosition(position);
  };

  const setMarginTop = () => {
    const field = document.querySelector('.new-form__field_selected');
    menuRef.current.style.marginTop = `${field.offsetTop}px`;
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
