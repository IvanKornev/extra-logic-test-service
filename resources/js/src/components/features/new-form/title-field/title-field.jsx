import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { form } from '@global-states';
import { formValues } from '@constants';

import { FieldBox } from '@components/reusable';
import { TextField } from '@mui/material';
import { styles } from './title-field.styles';

export const NewFormTitleField = observer(({ menuComponent }) => {
  const [name, setName] = useState(formValues.name);
  const [description, setDescription] = useState(formValues.description);
  return (
    <div style={styles.wrapper}>
      <FieldBox onClick={() => form.selectField(null)} withBorder>
        <TextField
          color='secondary'
          variant='standard'
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          onBlur={() => form.changeTitleField({ name, description })}
          sx={styles.fields.name}
        />
        <TextField
          color='secondary'
          variant='standard'
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
          onBlur={() => form.changeTitleField({ name, description })}
          sx={styles.fields.description}
        />
      </FieldBox>
      {!form.selectedField && menuComponent}
    </div>
  );
});

NewFormTitleField.propTypes = {
  menuComponent: PropTypes.element.isRequired,
};
