import React from 'react';
import {shallow} from 'enzyme';
import CancelBookingForm from '../../../components/Pages/CancelBookingForm';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState) => [initialState, setState]);
const wrapper = shallow(<CancelBookingForm />);

let mockAxios;


test('Should test CancelBookingForm component', () => {
  expect(wrapper).toMatchSnapshot ();
});


describe("Unit test for CancelBookingForm", () => {
    it('should render Delete Button', () => {
        const wrapper = shallow(<CancelBookingForm />)
        const deleteButtonElement = wrapper.find("#DeleteButton");
        expect(deleteButtonElement).toHaveLength(1);
        expect(deleteButtonElement.text()).toEqual('Delete');
    });
});

it("should update state on input change and toggle setOpen on button click", () => {
    expect(wrapper.find('#phoneNo').text()).toEqual('');
    wrapper.find('#phoneNo').simulate('change',{target: {value: '9988776655'}});
    expect(wrapper.find('#phoneNo').get(0).props.value).toEqual('9988776655');
      const newInputValue = true;
      wrapper
        .find('#DeleteButton')
        .simulate("click", { target: { value: newInputValue } });
      expect(setState).toHaveBeenCalledWith(newInputValue);
      wrapper
        .find('#alert')
        .simulate("close", { target: { value: false } });
      expect(setState).toHaveBeenCalledWith(false);
        });


describe('Testing of axios request', () => {
  const event = { preventDefault: () => {} };
  beforeEach(() => {
    mockAxios = new MockAdapter(Axios);
    jest.spyOn(event, 'preventDefault');
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should test handleSubmit", () => {

    const event = {preventDefault: ()=> {}};
    wrapper
    .find('#form')
    .simulate("submit",event);
  });
  
});