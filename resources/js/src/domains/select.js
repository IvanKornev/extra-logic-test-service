import { Select, MenuItem } from '@mui/material';

const renderOptions = component => (
  component.options.map((option) => (
    <MenuItem value={ option.value }>
        { option.title }
    </MenuItem>
)));

const isSelect = component => (
  component.name === Select && true
);

export const select  = { renderOptions, isSelect };
