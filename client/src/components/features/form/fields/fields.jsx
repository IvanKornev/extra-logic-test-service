import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

import { wasSelected, getFieldClasses } from '@entities';
import { formsStructure } from '@constants';
import { formState } from '@global-states';
import { LinkedListConverter } from '@lib/converters';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';
import styles from './fields.module.scss';

export const FormFields = observer((props) => {
  const { selectedFieldComponent } = props;
  const currentId = formState.selectedField?.uniqueId;
  const fields = LinkedListConverter.toArray(formState.fieldsList);
  return (
    <>
      {fields.length !== 0 &&
        fields.map((field) => {
          const isSelectedField = wasSelected(field.uniqueId, currentId);
          const classes = getFieldClasses(isSelectedField, styles, 'default');
          return (
            <FieldBox
              key={field.uniqueId}
              onClick={() => formState.selectField(field)}
              additionalClasses={classes}>
              {!isSelectedField && (
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
              {isSelectedField && selectedFieldComponent}
            </FieldBox>
          );
        })}
    </>
  );
});

FormFields.propTypes = {
  selectedFieldComponent: PropTypes.element.isRequired,
};
