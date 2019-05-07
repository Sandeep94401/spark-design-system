import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '../../../windowStubs';
import SprkStepperItem from './SprkStepperItem';

Enzyme.configure({ adapter: new Adapter() });

// Root Element Tests
it('should display a stepperitem element with the correct base class', () => {
  const wrapper = shallow(<SprkStepperItem />);
  expect(wrapper.find('li.sprk-c-Stepper__step').length).toBe(1);
});

it ('should correctly apply the title property', () => {
  const expected = 'expected_title'
  const wrapper = mount(<SprkStepperItem title={ expected } />);

  const actual = wrapper.find('h3.sprk-c-Stepper__step-heading').text();

  expect(actual).toBe(expected);
});

it ('should correctly apply additional classes', () => {
  const expected = 'expected_class'
  const wrapper = mount(<SprkStepperItem additionalClasses={ expected } />);

  expect(wrapper.find('li.sprk-c-Stepper__step').hasClass(expected)).toBe(true);
});

it ('should correctly apply isSelected prop', () => {
  const expected = 'sprk-c-Stepper__step--selected';
  const wrapper = mount(<SprkStepperItem isSelected={ true } />);
  const node = wrapper.find('li.sprk-c-Stepper__step');

  expect(node.hasClass(expected)).toBe(true);
  expect(node.getDOMNode().attributes.getNamedItem('aria-selected').value).toEqual('true');
});

it ('should correctly apply idString', () => {
  const expected = 'I am an id string';
  const wrapper = mount(<SprkStepperItem idString={expected} />);
  const node = wrapper.find('li.sprk-c-Stepper__step');

  expect(node.getDOMNode().attributes.getNamedItem('data-id').value).toEqual(expected);
});

it ('should correctly apply analyticsString', () => {
  const expected = 'I am an analytics string';
  const wrapper = mount(<SprkStepperItem analyticsString={expected} />);
  const node = wrapper.find('li.sprk-c-Stepper__step');

  expect(node.getDOMNode().attributes.getNamedItem('data-analytics').value).toEqual(expected);
});