import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import reduxStore from '../store';
import ResetPassword from '../components/authentication/resetPassword';

const resetPasswordComponent = (props={
    location: {
        search: 'http://localhost:3000/password/reset?token=thisismyfaketoken'
    },
    history: {},
    user: {},
    push: jest.fn(),
    resetPasswordAction: jest.fn(),
}) => {
    const component = mount(
        <Provider store={reduxStore}>
            <ResetPassword {...props}/>
        </Provider>
    );
    return component
}
describe('resetPassword component tests', () => {
    let component;
    beforeEach(() => {
        component = resetPasswordComponent()
    })
    it('should render resetPassword component', () => {
        expect(component.exists()).toBe(true);
    });

    it('should render resetPassword title', () => {
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should submit a form with all info', async () => {
        const wrapper = component.find('.container');
        expect(wrapper.length).toBe(1);
    });
});
