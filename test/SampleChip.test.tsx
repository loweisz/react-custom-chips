import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import SampleChip from '../src/SampleChip';

describe('SampleChip', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  test('renders correctly', () => {
    const onRemoveFunc = jest.fn();
    const component = shallow(
      <SampleChip
        value={{ id: '1', name: 'chip', onRemove: onRemoveFunc}}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
  test('click close triggers onRemove', () => {
    const onRemoveFunc = jest.fn();
    const component = shallow(
      <SampleChip
        value={{ id: '1', name: 'chip', onRemove: onRemoveFunc}}
      />,
    );
    component.find('.remove').simulate('click');
    expect(onRemoveFunc).toBeCalled();
    expect(toJson(component)).toMatchSnapshot();
  });
});
