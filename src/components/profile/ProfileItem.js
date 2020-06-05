import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import
{
  Col, Form,
} from 'react-bootstrap';
import '../../scss/profile.scss';


const ProfileItem = forwardRef(({
  name,
  value,
  type,
  onChange,
  pattern, errorMessage, placeholder, disabled, classes, children, checked,
}, ref) => {
  const withChildren = (
    <Form.Group check as={Col}>
      <Form.Label className="check-container" check>
        {placeholder}
        <Form.Control
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {children}
      </Form.Label>
    </Form.Group>
  );

  return (children ? (withChildren) : (
    <Form.Group as={Col} sm>
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control
        ref={ref}
        defaultValue={value}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required
        pattern={pattern}
        disabled={disabled}
        className={classes}
      />
      {children}
      <div className="input-error">{errorMessage}</div>
    </Form.Group>
  ));
});

ProfileItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'date', 'email']),
  pattern: PropTypes.string,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  checked: PropTypes.bool,
};

ProfileItem.defaultProps = {
  onChange: null,
  classes: '',
  disabled: false,
  children: null,
  checked: false,
  errorMessage: '',
  pattern: null,
  placeholder: '',
  type: null,
  value: '',

};
export default ProfileItem;
