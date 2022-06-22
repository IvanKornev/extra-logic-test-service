import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

import { wasSelected } from '@domains';
import { formFields } from '@constants';
import { form } from '@global-states';
import { LinkedListConverter } from '@lib/converters';

import { Typography, Stack } from '@mui/material';
import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';
import styles from './fields.module.scss';

const NewFormFields = observer((props) => {
  const { selectedFieldComponent, menuComponent } = props;
  const currentId = form.selectedField?.uniqueId;
  const fields = LinkedListConverter.toArray(form.fieldsList);
  const divClasses = `new-form__field ${styles['field']}`;
  return (
    <>
      {fields.length !== 0 &&
        fields.map((field) => (
          <div
            onClick={() => form.selectField(field)}
            key={field.uniqueId}
            className={divClasses}>
            <FieldBox>
              <div>
                {!wasSelected(field.uniqueId, currentId) && (
                  <>
                    {formFields.map((name) => (
                      <Stack
                        className={`new-form__field_${name}`}
                        key={name}
                        direction='row'>
                        <Typography component='h3' variant='h6'>
                          {field[name]}
                        </Typography>
                        {field.isRequired && name === 'name' && (
                          <RequiredFieldMark />
                        )}
                      </Stack>
                    ))}
                    {field.type === 'select' && (
                      <OptionsList
                        scrollbarColor='purple'
                        list={field.selectOptions}
                      />
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
