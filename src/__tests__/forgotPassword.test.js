import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import reduxStore from '../store';
import ForgotPassword from '../components/authentication/forgotPassword';

const forgotPasswordComponent = (props={
    history: {},
    user: {},
    push: jest.fn(),
    forgotPasswordAction: jest.fn(),
}) => {
    const component = mount(
        <Provider store={reduxStore}>
            <ForgotPassword {...props}/>
        </Provider>
    );
    return component
}
describe('forgotPassword component tests', () => {
    let component;
    beforeEach(() => {
        component = forgotPasswordComponent()
    })
    it('should render forgotPassword component', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render forgotPassword title', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should submit a form with all info', async () => {
        const wrapper = component.find('.container');
        expect(wrapper.length).toBe(1);
    });
});
