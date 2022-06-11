import React, { useId, useState } from 'react';
import { useFormik, Formik, Form } from 'formik';
import generateId from 'uniqid';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';
import { fieldTypes, formFields } from '@constants';
import { useSelectOptionsHandler } from '@hooks';

import { NewOptionEditor } from '@components/features/editor';
import { LabledSwitch, OptionsHandler } from '@components/reusable';
import { UilCheckCircle } from '@iconscout/react-unicons';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { styles } from './editing-field.styles';

const NewFormEditingField = observer(() => {
  const [editorWasOpened, openEditor] = useState(false);
  const { optionsList, handlers } = useSelectOptionsHandler(
    form.selectedField.selectOptions,
  );
  const formik = useFormik({
    initialValues: form.selectedField,
    onSubmit: (values) => {
      const { uniqueId } = form.selectedField;
      if (optionsList) {
        values.selectOptions = optionsList;
      }
      form.changeField(uniqueId, values);
    },
  });
  return (
    <>
      <Formik
        initialValues={formik.initialValues}
        onSubmit={formik.handleSubmit}>
        <Form style={styles.wrapper}>
          {formFields.map((name) => {
            const id = useId();
            return (
              <TextField
                key={id}
                color='secondary'
                variant='standard'
                placeholder={form.selectedField[name]}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                sx={styles.field}
              />
            );
          })}
          <FormControl size='small'>
            <Select
              name='type'
              onChange={formik.handleChange}
              value={formik.values.type}
              color='secondary'
              sx={styles.select}>
              {fieldTypes.map((type) => (
                <MenuItem value={type.value} key={generateId()}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
            {formik.values.type === 'select' && (
              <OptionsHandler
                openEditor={openEditor}
                editorWasOpened={editorWasOpened}
                options={optionsList}
                optionsHandlers={handlers}
                editorComponent={
                  <NewOptionEditor
                    abortCallback={() => openEditor(false)}
                    isVisible={editorWasOpened}
                    optionsHandlers={handlers}
                  />
                }
              />
            )}
          </FormControl>
          <div style={styles.footer}>
            {formik.dirty && (
              <Button
                startIcon={<UilCheckCircle />}
                type='submit'
                color='success'
                onClick={formik.changeHandler}
                disabled={formik.values.type === 'select' && optionsList.length === 0}>
                Сохранить
              </Button>
            )}
            <LabledSwitch
              defaultState={form.selectedField.isRequired && true}
              label='Обязательное поле'
              name='isRequired'
              changeHandler={formik.handleChange}
            />
          </div>
        </Form>
      </Formik>
    </>
  );
});

export { NewFormEditingField };
