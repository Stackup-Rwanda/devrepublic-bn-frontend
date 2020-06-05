import React from 'react';
import PropTypes from 'prop-types';
import
{
  Col, Form,
} from 'react-bootstrap';

const FormSelect = ({
  options, name, setValue, label, value, choose,
}) => {
  const allOptions = options.map((el) => (<option value={el.value} key={el.value}>{el.text}</option>));
  return (
    <Form.Group as={Col}>
      <Form.Label>{label}</Form.Label>
      <Form.Control onChange={setValue} name={name} value={value} as="select">
        <option selected hidden>{choose}</option>
        {allOptions}
      </Form.Control>
    </Form.Group>
  );
};
FormSelect.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.string,
  choose: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
export default FormSelect;
