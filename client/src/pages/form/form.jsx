import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getForm } from '@api';
import { observer } from 'mobx-react-lite';
import { formState } from '@global-states';

import styles from './form.module.scss';
import { CurrentFormLayout } from '@layouts';
import { FieldCreator } from '@components/features/creators';
import {
  FormFields,
  FormMenu,
  FormEditingField,
  FormTitleField,
} from '@components/features/form';

export const FormPage = observer(() => {
  const { formId } = useParams();
  useEffect(() => {
    if (formId) {
      const getData = async () => {
        const { receivedForm } = await getForm(formId);
        formState.useSavedData(receivedForm);
      };
      getData();
    }
  }, []);
  formState.fieldsCounter;
  const creatorRef = useRef();
  return (
    <>
      <CurrentFormLayout>
        <div className={styles['page__fields']}>
          <FormTitleField />
          <FormFields selectedFieldComponent={<FormEditingField />} />
        </div>
        <div className={styles['page__menu']}>
          <FormMenu
            ref={creatorRef}
            onlyAddOption={!formState.selectedField ? true : false}
          />
        </div>
      </CurrentFormLayout>
      <FieldCreator ref={creatorRef} />
    </>
  );
});
