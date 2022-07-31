import React from 'react';
import {shallow} from 'enzyme';
import UpdateBookingForm from '../../../components/Pages/UpdateBookingForm';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mockAxios;
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState) => [initialState, setState]);
const wrapper = shallow(<UpdateBookingForm />);


test('Should test UpdateBookingForm component', () => {
    expect(wrapper).toMatchSnapshot ();
});

it("should update state on input change and toggle setOpen on button click", () => {

    expect(wrapper.find('#phoneNo').text()).toEqual('');
    wrapper.find('#phoneNo').simulate('change',{target: {value: '9988776655'}});
    expect(wrapper.find('#phoneNo').get(0).props.value).toEqual("9988776655");
  
    expect(wrapper.find('#members').text()).toEqual("");
    wrapper.find('#members').simulate('change',2);
    expect(wrapper.find('#members').get(0).props.value).toEqual(2);
  
    expect(wrapper.find('#reservationTime').text()).toEqual('');
    wrapper.find('#reservationTime').simulate('change',{target: {value: '12:10:00'}});
    expect(wrapper.find('#reservationTime').get(0).props.value).toEqual("12:10:00");
  
    const newInputValue = true;
      wrapper
        .find('#updateButton')
        .simulate("click", { target: { value: newInputValue } });
      expect(setState).toHaveBeenCalledWith(newInputValue);
  
      wrapper
        .find('#alert')
        .simulate("close", { target: { value: false } });
      expect(setState).toHaveBeenCalledWith(false);
    });

    describe('Testing of form submission', () => {
        const target = {
            phoneNo: '',
            members: '',
            reservationTime: ''
        };

        const event = { preventDefault: () => {}, target };
        beforeEach(() => {
          mockAxios = new MockAdapter(Axios);
          jest.spyOn(event, 'preventDefault');
        });
      
        afterEach(() => {
          mockAxios.reset();
        });
      
        it("should test handleSubmit", () => {
      
          wrapper
          .find('#form')
          .simulate("submit",event);
        });
        
      });