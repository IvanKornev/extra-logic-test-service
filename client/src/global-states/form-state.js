import { makeAutoObservable } from 'mobx';

import { DoublyLinkedList } from '@data-structures';
import { LinkedListConverter } from '@lib/converters';
import { initialValues } from '@constants';
import { saveForm } from '@api';
import { createField, removeField, changeField, copyField } from '@entities';

class FormGlobalState {
  fieldsList = new DoublyLinkedList();

  titleField = initialValues.titleField;

  selectedField = null;

  fieldsCounter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  selectField(value) {
    this.selectedField = value;
  }

  dropFieldsList() {
    this.fieldsList = new DoublyLinkedList();
  }

  setFieldsList(list = []) {
    list.forEach((item) => {
      createField(item, this.fieldsList);
    });
  }

  setFieldsCounter(value = 0) {
    this.fieldsCounter = value;
  }

  createField(values) {
    createField(values, this.fieldsList);
    this.setFieldsCounter((this.fieldsCounter += 1));
  }

  removeField() {
    const id = this.selectedField.uniqueId;
    const neighboringField = removeField(id, this.fieldsList);
    this.selectField(neighboringField);
    this.setFieldsCounter((this.fieldsCounter -= 1));
  }

  changeField(id, values) {
    changeField(id, values, this.fieldsList);
    this.selectField(null);
  }

  changeTitleField(values) {
    this.titleField = values;
  }

  copyField() {
    const id = this.selectedField.uniqueId;
    const results = copyField(id, this.fieldsList);
    this.selectField(results.copiedValue);
    this.setFieldsCounter((this.fieldsCounter += 1));
  }

  useSavedData(form) {
    form.fields.forEach((field) => {
      this.createField(field);
    });
    this.selectField(null);

    const { name, description } = form;
    this.changeTitleField({ name, description });
  }

  async save() {
    const savingData = {
      title: { ...this.titleField },
      fields: LinkedListConverter.toArray(this.fieldsList),
    };
    await saveForm(savingData);
  }

  reset() {
    this.selectField(null);
    this.dropFieldsList();
    this.changeTitleField(initialValues.titleField);
    this.setFieldsCounter();
  }
}

export const formState = new FormGlobalState();
