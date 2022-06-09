import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';
import { Typography, Stack } from '@mui/material';

import { wasSelected } from '@domains';
import { formFields } from '@constants';
import { form } from '@global-states';
import { LinkedListConverter } from '@lib/converters';

import { styles } from './fields.styles';

const NewFormFields = observer((props) => {
  const { selectedFieldComponent, menuComponent } = props;
  const currentId = form.selectedField?.uniqueId;
  return (
    <>
      {form.fieldsList.length !== 0 &&
        LinkedListConverter.toArray(form.fieldsList).map((field) => (
          <div style={styles.wrapper}>
            <FieldBox
              onClick={() => form.selectField(field)}
              key={field.uniqueId}>
              <div>
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
    </>
  );
});

NewFormFields.propTypes = {
  menuComponent: PropTypes.element.isRequired,
  selectedFieldComponent: PropTypes.element.isRequired,
};

export { NewFormFields };
