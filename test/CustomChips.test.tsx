import React from 'react';
import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import CustomChips from "../src/CustomChips";

describe('SampleChip', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  test('renders correctly', () => {
    const component = shallow(
      <CustomChips

      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  test('shows passed chips', () => {
    const chipsData = [
      { id: '1', name: 'one' },
      { id: '2', name: 'two' },
      { id: '3', name: 'three' },
      { id: '4', name: 'four' },
    ];
    const component = render(
      <CustomChips
        chipsData={chipsData}
      />,
    );
    const chips = component.find('.chip');
    expect(chips.length).toEqual(chipsData.length)
  });
  test('remove one chip works', () => {
    const chipsData = [
      { id: '1', name: 'one' },
      { id: '2', name: 'two' },
      { id: '3', name: 'three' },
      { id: '4', name: 'four' },
    ];
    const component = mount(
      <CustomChips
        chipsData={chipsData}
      />,
    );
    const chip = component.find('.chips_wrapper').find('.chip').first();
    chip.find('.remove').simulate('click');
    expect(component.find('.chips_wrapper').find('.chip').length).toEqual(chipsData.length - 1)
  });
});
