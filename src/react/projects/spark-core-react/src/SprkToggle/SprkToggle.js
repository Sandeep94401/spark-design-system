import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SprkIcon from '../SprkIcon/SprkIcon';

class SprkToggle extends Component {
  constructor(props) {
    super(props);
    const { defaultOpen } = this.props;
    this.state = {
      isOpen: defaultOpen || false,
      height: defaultOpen ? 'auto' : 0,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      height: !prevState.isOpen ? 'auto' : 0,
    }));
  }

  render() {
    const {
      children,
      idString,
      additionalClasses,
      analyticsString,
      title,
      titleAddClasses,
      iconAddClasses,
      toggleIconName,
      ...other
    } = this.props;
    const { isOpen, height } = this.state;

    const titleClassNames = classnames(
      'sprk-b-TypeBodyThree sprk-b-Link sprk-b-Link--has-icon sprk-b-Link--simple',
      titleAddClasses,
    );

    const iconClasses = classnames(
      'sprk-c-Icon--l sprk-c-Icon--toggle sprk-u-mrs',
      { 'sprk-c-Icon--open': isOpen },
      iconAddClasses,
    );

    return (
      <div data-id={idString} {...other} className={additionalClasses}>
        <a className={titleClassNames} href="#nogo" data-analytics={analyticsString} onClick={this.toggleOpen}>
          <SprkIcon iconName={toggleIconName} additionalClasses={iconClasses} />
          {title}
        </a>
        <AnimateHeight duration={300} height={height}>
          <div>
            {children}
          </div>
        </AnimateHeight>
      </div>
    );
  }
}

SprkToggle.defaultProps = {
  idString: '',
  additionalClasses: '',
  analyticsString: '',
  titleAddClasses: '',
  iconAddClasses: '',
  toggleIconName: 'chevron-down-circle-two-color',
};

SprkToggle.propTypes = {
  // The name of the icon to use in the toggle title
  toggleIconName: PropTypes.string,
  // The clickable title text
  title: PropTypes.string.isRequired,
  // The children of the tabs component (SprkTabsPanel)
  children: PropTypes.node.isRequired,
  // The data-id value for UI testing purposes
  idString: PropTypes.string,
  // The data-analytics value
  analyticsString: PropTypes.string,
  // A string of additional classes for the Tabs component
  additionalClasses: PropTypes.string,
  // Additional classes for the title text
  titleAddClasses: PropTypes.string,
  // Additional classes for the toggle icon
  iconAddClasses: PropTypes.string,
};

export default SprkToggle;
