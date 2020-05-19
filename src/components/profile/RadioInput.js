import React from 'react';
import PropTypes from 'prop-types';
import
{
  Col, Form,
} from 'react-bootstrap';
import '../../scss/profile.scss';
import FormItem from './ProfileItem';

const RadioInput = ({
  first,
  title, firstPlaceholder, secondPlaceholder, second, onChange, checkedFirst, checkedSecond, name,
}) => (
  <Form.Group as={Col}>
    <p className="email-notif-text">{title}</p>
    <Form.Row>
      <FormItem
        name={name}
        value={first}
        placeholder={firstPlaceholder}
        onChange={onChange}
        checked={checkedFirst}
      >
        <span className="custom-check" />
      </FormItem>
      <FormItem
        name={name}
        value={second}
        placeholder={secondPlaceholder}
        onChange={onChange}
        checked={checkedSecond}
      >
        <span className="custom-check" />
      </FormItem>

    </Form.Row>
  </Form.Group>
);
RadioInput.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  firstPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  secondPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  checkedFirst: PropTypes.bool.isRequired,
  checkedSecond: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

};

export default RadioInput;
