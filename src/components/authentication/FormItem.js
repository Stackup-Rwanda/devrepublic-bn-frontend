import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
} from 'react-bootstrap';


const FormItem = ({
  Col, defaultValue, placeholder, setValue, type,
}) => (
  <Form.Group as={Col}>
    <Form.Control
      required
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="signup-form_field"
      onChange={setValue}
    />
  </Form.Group>
);

FormItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  Col: PropTypes.elementType,
  defaultValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default FormItem;
