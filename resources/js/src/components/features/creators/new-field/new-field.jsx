import React, { useId, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { useSelectOptionsHandler, useFormBuilder } from '@hooks';
import { fieldValues, fieldFormStructure } from '@constants';

import styles from './new-field.module.scss';
import {
  CreatorModal,
  OptionsList,
  LabledSwitch,
  ValidatedField,
} from '@components/reusable';

const NewFieldCreator = observer(
  forwardRef((props, creatorRef) => {
    const { optionsState, handlers } = useSelectOptionsHandler();
    
    const optionsList = optionsState.list;
    const formik = useFormBuilder('new-field')(creatorRef, optionsList);
    
    const formData = {
      initialValues: fieldValues,
      formikInstance: formik,
    };
    const disableCondition =
      formik.values.type === 'select' && optionsState.list.length === 0;
    return (
      <CreatorModal
        creatingThing='field'
        ref={creatorRef}
        form={formData}
        submitIsDisable={disableCondition}
        title='Новое поле'>
        <CreatorFields formikInstance={formik} />
        {formik.values.type === 'select' && (
          <OptionsList
            scrollbarColor='blue'
            list={optionsState.list}
            handlers={handlers}
          />
        )}
        <div className={styles['new-field-editor__switch']}>
          <LabledSwitch
            label='Обязательное поле'
            name='isRequired'
            changeHandler={formik.handleChange}
          />
        </div>
      </CreatorModal>
    );
  }),
);

const CreatorFields = ({ formikInstance }) => (
  <>
    {fieldFormStructure.map((field) => {
      const id = useId();
      return (
        <ValidatedField
          key={id}
          id={`new-field-creator__field_${field.name}`}
          formikInstance={formikInstance}
          field={field}
        />
      );
    })}
  </>
);

export { NewFieldCreator };
