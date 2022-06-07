import { makeAutoObservable } from 'mobx';

import { LinkedList } from '@data-structures';
import { createField, removeField, changeField, copyField } from '@domains';

class FormGlobalState {
  fieldsList = new LinkedList();

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

  copyField() {
    const id = this.selectedField.uniqueId;
    const results = copyField(id);
    this.selectField(results.copiedValue);
  }
}

export const form = new FormGlobalState();
