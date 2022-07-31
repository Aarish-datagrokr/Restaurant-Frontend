import React from 'react';
import {shallow} from 'enzyme';
import Error from '../../../components/Pages/Error';

test('Should test Error component', () => {
    const wrapper = shallow(<Error />);
    expect(wrapper).toMatchSnapshot();
});
