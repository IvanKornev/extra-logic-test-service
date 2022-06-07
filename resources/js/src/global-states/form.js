import { makeAutoObservable } from "mobx"

import { LinkedList } from '@data-structures';
import {
  createField,
  removeField,
  changeField,
  copyField,
} from '@domains';

class FormGlobalState {
  fieldsList = new LinkedList();
  selectedField = null;

  constructor() {
    makeAutoObservable(this);
  }

  selectField(value) {
    this.selectField = value;
  }

  createField(values) {
    createField(values, this.fieldsList);
  }

  removeField(id) {
    removeField(id, this.fieldsList);
    this.selectField(results.remainedNode);
  }

  changeField(id, values) {
    changeField(id, values);
    this.selectField(null);
  }

  copyField(id) {
    const results = copyField(id);
    this.selectField(results.copiedValue);
  }
}

export const form = new FormGlobalState ();