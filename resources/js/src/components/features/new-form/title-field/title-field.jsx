import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { form } from '@global-states';
import { formFields } from '@constants';
import { UseTitleFieldHandler } from '@hooks';

import { FieldBox } from '@components/reusable';
import { TextField } from '@mui/material';
import { styles } from './title-field.styles';

export const NewFormTitleField = observer(({ menuComponent }) => {
  const { fields, handle } = UseTitleFieldHandler();
  return (
    <div style={styles.wrapper}>
      <FieldBox onClick={() => form.selectField(null)} withBorder>
        {formFields.map((fieldName) => (
          <TextField
            key={useId()}
            color='secondary'
            variant='standard'
            value={fields[fieldName]}
            onChange={(e) => handle(e, fieldName)}
            onBlur={() => form.changeTitleField(fields)}
            sx={styles.fields[fieldName]}
          />
        ))}
      </FieldBox>
      {!form.selectedField && menuComponent}
    </div>
  );
});

NewFormTitleField.propTypes = {
  menuComponent: PropTypes.element.isRequired,
};
