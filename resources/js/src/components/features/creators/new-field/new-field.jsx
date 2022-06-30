import React, { useId, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { useSelectOptionsHandler, useFormBuilder } from '@hooks';
import { formsStructure } from '@constants';

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
    const form = useFormBuilder('new-field')(creatorRef, optionsList);
    const disableCondition =
      form.values.type === 'select' && optionsState.list.length === 0;
    return (
      <CreatorModal
        creatingThing='field'
        ref={creatorRef}
        formInstance={form}
        submitIsDisable={disableCondition}
        title='Новое поле'>
        <CreatorFields formInstance={form} />
        {form.values.type === 'select' && (
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
            changeHandler={form.handleChange}
          />
        </div>
      </CreatorModal>
    );
  }),
);

const CreatorFields = ({ formInstance }) => (
  <>
    {formsStructure.field.map((field) => {
      const id = useId();
      return (
        <ValidatedField
          key={id}
          id={`new-field-creator__field_${field.name}`}
          formInstance={formInstance}
          field={field}
        />
      );
    })}
  </>
);

export { NewFieldCreator };
