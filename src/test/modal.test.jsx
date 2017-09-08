import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { ModalAddWidget, mapStateToProps, mapDispatchToProps } from '../components/ModalAddWidget/';

const state = {
  widgets: {
    showAddWidgetModal: true,
    ids: ['slack']
  }
};

describe('ModalAddWidget component', () => {
  it('should render a component with props as specified ', () => {
    const addWidget = jest.fn();
    const hideAddWidgetModal = jest.fn();
    const component = shallow(
      <ModalAddWidget
        addWidget={addWidget}
        hideAddWidgetModal={hideAddWidgetModal}
        ids={['slack']}
        showAddWidgetModal={true}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
    });

  it ('maps given state to props ', () => {
    const expected = {
      showAddWidgetModal: true,
      ids: ['slack']
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('maps component dispatches to props ', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('addWidget');
    expect(mapDispatchToProps(dispatch)).toHaveProperty('hideAddWidgetModal');
  });
});
