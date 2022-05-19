import { fieldEditor, select } from '../../../domains';

const Fields = ({ formikInstance }) => (
  <>
    { fieldEditor.fields.map((field) => {
      const { name, label, component } = field;
      const { isSelect, renderOptions } = select;

      const CurrentComponent = component.name;
        return(
          <CurrentComponent
            name={ name }
            label={ label }
            value={ formikInstance.values[name] }
            variant="standard"
            onChange={ formikInstance.handleChange }
        >
          { isSelect(component) && renderOptions(component) }
        </CurrentComponent>
      );
    })}
  </>
);

export { Fields };
