import React, { useId, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';
import { Typography, Stack, TextField, Button } from '@mui/material';

import { wasSelected } from '@domains';
import { formFields, formValues } from '@constants';
import { form } from '@global-states';

import { styles } from './fields.styles';

const NewFormFields = observer((props) => {
  const { fields, selectedFieldComponent, menuComponent } = props;
  const currentId = form.selectedField?.uniqueId;
  const [name, setName] = useState(formValues.name);
  const [description, setDescription] = useState(formValues.description);
  return (
    <div style={styles.fieldsContainer}>
      <div style={styles.singleField}>
        <FieldBox onClick={() => form.selectField(null)} withBorder>
          <TextField
            color='secondary'
            variant='standard'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            sx={styles.titleFields.name}
          />
          <TextField
            color='secondary'
            variant='standard'
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value)
            }}
            sx={styles.titleFields.description}
          />
          <Button
            onClick={() => {
              form.changeTitleField({ name, description })
            }}>
            Сохранить
          </Button>
        </FieldBox>
        {!form.selectedField && menuComponent}
      </div>
      {fields.length !== 0 &&
        fields.map((field) => (
          <div style={styles.singleField}>
            <FieldBox
              onClick={() => form.selectField(field)}
              key={field.uniqueId}>
              <div style={styles.wrapper}>
                {!wasSelected(field.uniqueId, currentId) && (
                  <>
                    {formFields.map((name) => (
                      <Stack direction='row'>
                        <Typography
                          key={generateId()}
                          component='h3'
                          variant='h6'
                          sx={styles.heading}>
                          {field[name]}
                        </Typography>
                        {field.isRequired && name === 'name' && (
                          <RequiredFieldMark />
                        )}
                      </Stack>
                    ))}
                    {field.type === 'select' && (
                      <OptionsList list={field.selectOptions} />
                    )}
                  </>
                )}
                {wasSelected(field.uniqueId, currentId) &&
                  selectedFieldComponent}
              </div>
            </FieldBox>
            {wasSelected(field.uniqueId, currentId) && menuComponent}
          </div>
        ))}
    </div>
  );
});

NewFormFields.defaultTypes = {
  fields: [],
};

NewFormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  menuComponent: PropTypes.element.isRequired,
  selectedFieldComponent: PropTypes.element.isRequired,
};

export { NewFormFields };
