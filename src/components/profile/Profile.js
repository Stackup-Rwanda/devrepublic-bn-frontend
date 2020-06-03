
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import
{
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import NavBar from '../sharedComponents/AuthNavBar';
import Footer from '../sharedComponents/Footer';
import placeholder from '../../assets/users.png';
import {
  getUserInfo, updateProfile, setEmailNotif, setProfileImage,
} from '../../redux/actions/userActions';
import FormItem from './ProfileItem';
import '../../scss/profile.scss';
import SideBar from '../sharedComponents/Sidebar';
import RadioInput from './RadioInput';
import translate from '../languages/Translate';
import FormSelect from './FormSelect';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.langInput = createRef();
    this.departmentInput = createRef();
    this.currencyInput = createRef();
    this.residenceInput = createRef();
    this.birthdateInput = createRef();
    this.successRef = createRef();
    this.errorRef = createRef();
    this.state = {
      submitLoading: false,
      firstName: '',
      lastName: '',
      role: '',
      birthdate: '',
      image: null,
      email: '',
      residence: '',
      language: '',
      department: '',
      currency: '',
      emailNotifications: false,
      gender: '',
      modified: false,
      redirect: false,
    };
    this.updateInfo = this.updateInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const token = await this.props.token || localStorage.getItem('token');
    await dispatch(getUserInfo(token));
    this.setState((state, props) => ({
      language: props.profile.language,
      currency: props.profile.currency,
      department: props.profile.department,
      residence: props.profile.residence || '',
      gender: props.profile.gender,
      emailNotifications: props.profile.emailNotifications,
      birthdate: props.profile.birthdate,
      role: props.profile.role,
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      email: props.profile.email,
    }));
    if (this.props.profile.profileFetchError
      || this.props.profile.fetchImageError
      || this.props.profile.setEmailNotifError) {
      this.setState({ redirect: true });
    }
  }

  handleChange(event) {
    const {
      name, value, files, type, checked,
    } = event.target;
    if (type === 'checkbox') return this.setState({ [name]: checked });
    return this.setState({ [name]: (name === 'image') ? files[0] : value });
  }

  async updateInfo(event) {
    event.preventDefault();
    const token = this.props.token || localStorage.getItem('token');
    const {
      language, currency, residence, gender, emailNotifications, image, department, birthdate,
    } = this.state;
    const {
      dispatch, profile,
    } = this.props;
    const {
      profileFetchError, firstName: propFirstName, emailNotifications: emailNotif,
      lastName: propLastName, email: propEmail, role: propRole, fetchImageError,
      setEmailNotifError, id, isVerified, image: propsImage, ...propInfo
    } = profile;
    this.setState({ submitLoading: true });
    const userInfo = {
      language,
      currency,
      department,
      birthdate,
      residence,
      gender,
    };
    if (!_.isEqual(propInfo, userInfo) && residence.length > 0 && !(this.birthdateInput.current.value.length === 0) && currency && department && language && gender) {
      await dispatch(updateProfile(token, userInfo));
      this.setState({ modified: true });
    }
    if (emailNotifications !== profile.emailNotifications) {
      await dispatch(setEmailNotif(token, emailNotifications));
      this.setState({ modified: true });
    }
    if (image) {
      await dispatch(setProfileImage(token, image));
      this.setState({ modified: true });
    }
    if (!profileFetchError && !fetchImageError && !setEmailNotifError) {
      this.successRef.current.style.display = 'block';
      setTimeout(() => {
        this.successRef.current.style.display = 'none';
        this.setState({ modified: false });
      }, 3000);
    }
    this.setState({ submitLoading: false, image: null });
  }

  render() {
    const {
      firstName, lastName, residence, redirect, gender, emailNotifications,
      email, role, language, submitLoading, currency, department, birthdate, modified,
    } = this.state;

    const { intl, token } = this.props;
    const choose = intl.formatMessage({ id: 'Choose...', value: 'Choose...' });
    return redirect ? (<Redirect to="/login" />) : (
      <>
        <SideBar>
          <div className="nav-item same-page">
            <Link to="/profile">{translate('Profile')}</Link>
          </div>
          <div className="nav-item">
            <Link to="/dashboard">
              {translate('Travel Requests')}
            </Link>
          </div>
        </SideBar>
        <NavBar token={token || localStorage.getItem('token')} image={this.props.profile.image} />
        <Container fluid="lg" className="profile-container">
          <Row>
            <Col md={5} className="d-flex flex-column align-items-center profile-column">
              <p id="first-paragraph">
                {translate('Profile Settings')}
              </p>
              <img width={180} height={180} className="mr-3" src={this.props.profile.image || placeholder} alt="profile" />
              <div className="upload">
                <Button type="button">{translate('upload')}</Button>
                <input type="file" onChange={this.handleChange} name="image" />
              </div>
              <p>
                <span>{translate('Role')}</span>
                <span>{role || 'requester'}</span>
              </p>
            </Col>
            <Col md={7} className="form-column">
              <Form noValidate onSubmit={this.updateInfo}>
                <div ref={this.successRef} className="alert-info alert submit-success">
                  {modified ? translate('Saved successfully') : translate('fill out or modify your profile before saving')}
                </div>
                <Form.Row>
                  <FormItem name="firstName" placeholder={intl.formatMessage({ id: 'First name', value: 'First name' })} value={firstName} type="text" disabled />
                  <FormItem name="lastName" placeholder={intl.formatMessage({ id: 'Last Name', value: 'Last Name' })} value={lastName} type="text" disabled />
                </Form.Row>
                <Form.Row>
                  <FormItem name="email" type="email" placeholder="Email" disabled value={email} />
                  <FormItem type="text" placeholder={intl.formatMessage({ id: 'Residence', value: 'Residence' })} ref={this.residenceInput} classes="input-master" name="residence" onChange={this.handleChange} value={residence} errorMessage={translate('Residence is required')} />
                </Form.Row>
                <Form.Row>
                  <FormSelect options={[{ value: 'USD', text: 'USD' }, { value: 'EUR', text: 'EUR' }, { value: 'RWF', text: 'RWF' }]} setValue={this.handleChange} name="currency" label={translate('Currency')} choose={choose} value={currency} errorMessage="we only support EUR, RWF, USD" pattern="/\b(EUR|USD|RWF)\b/" required />
                  <FormSelect options={[{ value: 'English', text: 'English' }, { value: 'French', text: 'French' }]} setValue={this.handleChange} name="language" label={translate('Language')} choose={choose} value={language} />
                </Form.Row>
                <Form.Row>
                  <FormSelect options={[{ value: 'IT', text: 'IT' }, { value: 'Finance', text: 'Finance' }, { value: 'communication', text: 'communication' }]} setValue={this.handleChange} name="department" label={translate('Department')} choose={choose} value={department} />
                  <FormItem type="date" ref={this.birthdateInput} placeholder={intl.formatMessage({ id: 'Date of birth', value: 'Date of birth' })} name="birthdate" classes="input-master" value={birthdate} onChange={this.handleChange} errorMessage={translate('date of birth is required')} />
                </Form.Row>
                <Form.Row>
                  <RadioInput title={translate('Gender')} first="Male" second="Female" firstPlaceholder={translate('Male')} secondPlaceholder={translate('Female')} checkedFirst={gender === 'Male'} checkedSecond={gender === 'Female'} onChange={this.handleChange} name="gender" />
                </Form.Row>
                <Form.Row>
                  <Form.Group id="formGridCheckbox">
                    <Form.Check onChange={this.handleChange} checked={emailNotifications} name="emailNotifications" type="checkbox" label={translate('Receive email notification')} />
                  </Form.Group>
                </Form.Row>
                <div className="d-flex">
                  <Button size="lg" id="form-button" disabled={submitLoading} type="submit">{submitLoading ? translate('Saving') : translate('Save')}</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    language: PropTypes.string,
    currency: PropTypes.string,
    role: PropTypes.string,
    residence: PropTypes.string,
    image: PropTypes.string,
    emailNotifications: PropTypes.bool,
    birthdate: PropTypes.string,
    department: PropTypes.string,
    gender: PropTypes.oneOf(['Male', 'Female']),
    setEmailNotifError: PropTypes.string,
    profileFetchError: PropTypes.string,
    fetchImageError: PropTypes.string,
    id: PropTypes.string,
    isVerified: PropTypes.bool,
  }).isRequired,
  token: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
};
Profile.defaultProps = {
  token: null,
};
const mapStateToProps = ({ profile, user }) => ({
  profile,
  token: user.user.data,
});
export default injectIntl(connect(mapStateToProps)(Profile));
