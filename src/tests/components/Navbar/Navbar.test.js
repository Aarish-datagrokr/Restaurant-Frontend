import React from 'react';
import {shallow} from 'enzyme';
import Navbar from '../../../components/Navbar/Navbar';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState) => [initialState, setState]);
const wrapper = shallow(<Navbar />);

test('Should test Navbar component', () => {
    expect(wrapper).toMatchSnapshot();
});

it("should toggle isNavbarExpanded on click", () => {
    const newInputValue = true;
    wrapper
      .find('#hamburger')
      .simulate("click", { target: { value: newInputValue } });
    expect(setState).toHaveBeenCalledWith(newInputValue);
  });

  it("should toggle isNavbarExpanded on click", () => {
    const newInputValue = true;
    wrapper
      .find('#add')
      .simulate("click", { target: { value: newInputValue } });
    expect(setState).toHaveBeenCalledWith(newInputValue);
  });

  it("should toggle isNavbarExpanded on click", () => {
    const newInputValue = true;
    wrapper
      .find('#update')
      .simulate("click", { target: { value: newInputValue } });
    expect(setState).toHaveBeenCalledWith(newInputValue);
  });

  it("should toggle isNavbarExpanded on click", () => {
    const newInputValue = true;
    wrapper
      .find('#delete')
      .simulate("click", { target: { value: newInputValue } });
    expect(setState).toHaveBeenCalledWith(newInputValue);
  });