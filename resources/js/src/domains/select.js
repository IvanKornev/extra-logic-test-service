import { Select, MenuItem } from '@mui/material';
import generateId from 'uniqid';

const renderOptions = component => (
  component.options.map((option) => (
    <MenuItem key={ generateId() } value={ option.value }>
        { option.title }
    </MenuItem>
)));

const isSelect = component => (
  component.name === Select && true
);

export const select  = { renderOptions, isSelect };
