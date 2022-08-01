import React from 'react';
import {shallow} from 'enzyme';
import BookingForm from '../../../components/Pages/BookingForm';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
let mockAxios;

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState) => [initialState, setState]);
const wrapper = shallow(<BookingForm />);

describe("Unit test for BookingForm", () => {
    it('should render Delete Button', () => {
        const addButtonElement = wrapper.find("#addButton");
        expect(addButtonElement).toHaveLength(1);
        expect(addButtonElement.text()).toEqual('Submit');
    });
});

it("should update state on input change and toggle setOpen on button click", () => {

  expect(wrapper.find('#name').text()).toEqual('');
  wrapper.find('#name').simulate('change',{target: {value: 'Aarish'}});
  expect(wrapper.find('#name').get(0).props.value).toEqual('Aarish');

  expect(wrapper.find('#phoneNo').text()).toEqual('');
  wrapper.find('#phoneNo').simulate('change',{target: {value: '9988776655'}});
  expect(wrapper.find('#phoneNo').get(0).props.value).toEqual("9988776655");

  expect(wrapper.find('#members').text()).toEqual('');
  wrapper.find('#members').simulate('change',2);
  expect(wrapper.find('#members').get(0).props.value).toEqual(2);

  expect(wrapper.find('#reservationTime').text()).toEqual('');
  wrapper.find('#reservationTime').simulate('change',{target: {value: '12:10:00'}});
  expect(wrapper.find('#reservationTime').get(0).props.value).toEqual("12:10:00");

  const newInputValue = true;
    wrapper
      .find('#addButton')
      .simulate("click", { target: { value: newInputValue } });
    expect(setState).toHaveBeenCalledWith(newInputValue);

    wrapper
      .find('#alert')
      .simulate("close", { target: { value: false } });
    expect(setState).toHaveBeenCalledWith(false);
  });

  describe('Testing of form submission', () => {
    const target = {
        name: '',
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

  describe('Axios testing', () => {
    const addSpy = jest.spyOn(Axios,'post');
    const target = {
      name: '',
      phoneNo: '',
      members:'',
      reservationTime: ''
    };
    const event = { preventDefault: () => {},target};
  
  
    test('Booking confirmed', async () => {
        const response = {data: 'Table booked.'};
        Axios.post.mockResolvedValue(response);
        wrapper.find('#form').simulate('submit',event);
        expect(addSpy).toHaveBeenCalledWith("restaurant/Bookings/Book-For",{"name": undefined, "members": undefined, "phoneNo": undefined, "reservationTime": undefined},{"headers": {"content-type": "application/json"}});
        expect(useStateSpy).toHaveBeenCalled();    
      });
  
    test('Exception raised', async () => {
      const data = 'Something Wrong';
      const error = {response: data};
      Axios.post.mockRejectedValue(error);
      expect(useStateSpy).toHaveBeenCalled();    
    });
  });
  