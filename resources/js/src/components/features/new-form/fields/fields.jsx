import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

import { wasSelected } from '@domains';
import { formsStructure } from '@constants';
import { form } from '@global-states';
import { LinkedListConverter } from '@lib/converters';

import { Typography, Stack } from '@mui/material';
import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';
import styles from './fields.module.scss';

const NewFormFields = observer((props) => {
  const { selectedFieldComponent } = props;
  const currentId = form.selectedField?.uniqueId;
  const fields = LinkedListConverter.toArray(form.fieldsList);
  return (
    <>
      {fields.length !== 0 &&
        fields.map((field) => (
          <FieldBox
            key={field.uniqueId}
            onClick={() => form.selectField(field)}
            additionalClasses={['new-form__field', styles['field']]}>
            {!wasSelected(field.uniqueId, currentId) && (
              <>
                {formsStructure.titleField.map((structure) => {
                  const { name } = structure;
                  return (
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
                  );
                })}
                {field.type === 'select' && (
                  <OptionsList
                    scrollbarColor='purple'
                    list={field.selectOptions}
                  />
                )}
              </>
            )}
            {wasSelected(field.uniqueId, currentId) && selectedFieldComponent}
          </FieldBox>
        ))}
    </>
  );
});

NewFormFields.propTypes = {
  selectedFieldComponent: PropTypes.element.isRequired,
};

export { NewFormFields };
