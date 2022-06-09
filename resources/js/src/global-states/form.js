import { makeAutoObservable } from 'mobx';

import { LinkedList } from '@data-structures';
import { LinkedListConverter } from '@lib/converters';
import { saveForm } from '@api';
import { createField, removeField, changeField, copyField } from '@domains';

class FormGlobalState {
  fieldsList = new LinkedList();

  titleField = null;

  selectedField = null;

  constructor() {
    makeAutoObservable(this);
  }

  selectField(value) {
    this.selectedField = value;
  }

  createField(values) {
    createField(values, this.fieldsList);
  }

  removeField() {
    const id = this.selectedField.uniqueId;
    const results = removeField(id, this.fieldsList);
    this.selectField(results.remainedNode);
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
    this.fieldsList = new LinkedList();
  }
}

export const form = new FormGlobalState();