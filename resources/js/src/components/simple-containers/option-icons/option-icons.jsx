import React, { useId } from 'react';
import PropTypes from 'prop-types';

export const OptionIconsContainer = (props) => {
  const { icons, actions } = props;
  return (
    <>
      {icons.map((icon) => {
        const { action, component, params } = icon;
        const id = useId();
        const Icon = component;
        return (
          <Icon
            key={id}
            onClick={actions[action]}
            className={`options__actions_${action}`}
            { ...params }
          />
        );
      })}
    </>
  );
};

OptionIconsContainer.propTypes = {
  icons: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
