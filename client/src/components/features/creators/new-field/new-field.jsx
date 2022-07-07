import React, { useId, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { selectIsEmpty } from '@entities';
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
    const { list } = optionsState;
    const form = useFormBuilder('new-field')(creatorRef, list);
    const disableCondition = selectIsEmpty(form.values.type, list);
    const onClose = () => {
      form.resetForm();
      handlers.removeAll();
    };
    return (
      <CreatorModal
        creatingThing='field'
        ref={creatorRef}
        formInstance={form}
        onCloseCallback={onClose}
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
