/* global document */
import getElements from '../utilities/getElements';

// Get focusable elements in modal
const getFocusableEls = (modal) => {
  // Grab all focusable elements
  let focusEls = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
  focusEls = Array.prototype.slice.call(focusEls);
  return focusEls;
};

// Focus first el in modal
const focusFirstModalEl = (modal) => {
  const focusEls = getFocusableEls(modal);
  // If there are some then apply focus to first one
  if (focusEls.length > 0) {
    focusEls[0].focus();
  }
};

const isTabPressed = e => e.code === 'Tab' || e.keyCode === 9;

const isMaskClicked = e => e.target.getAttribute('data-sprk-modal') === 'mask';

const isEscPressed = e => e.key === 'Escape';

// Hide the modal and remove aria attribute on body
const hideModal = (modal, focusedBodyEl) => {
  const isHidden = modal.classList.contains('sprk-u-Hide');
  const mask = document.querySelector('[data-sprk-modal="mask"]');

  if (!isHidden) {
    // Modal does not have the hide class so we now add it to close it
    modal.classList.add('sprk-u-Hide');
    mask.classList.add('sprk-u-Hide');
    // We want to remove the hidden aria attr from body
    document.body.removeAttribute('aria-hidden');
    // Send focus back to last active element before modal was shown
    focusedBodyEl.focus();
  }
};

// Show the modal and set aria attribute true on body
const showModal = (modal) => {
  const isNotShown = modal.classList.contains('sprk-u-Hide');
  const mask = document.querySelector('[data-sprk-modal="mask"]');

  if (isNotShown) {
    // Modal is closed so now we show it
    modal.classList.remove('sprk-u-Hide');
    mask.classList.remove('sprk-u-Hide');
    // We want to alert assitive devices that body is hidden
    document.body.setAttribute('aria-hidden', 'true');
  }
};

const handleModalEvents = (modal, focusedBodyEl) => {
  // Grab body element
  const docBodyHidden = document.querySelector('[aria-hidden="true"]');

  // Attach listener for keydown
  docBodyHidden.addEventListener('keydown', (e) => {
    const focusableEls = getFocusableEls(modal);
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    // If escape is pressed then hide the modal
    if (isEscPressed(e)) {
      e.preventDefault();
      hideModal(modal, focusedBodyEl);
    }

    // If only 1 focusable element prevent default
    if (focusableEls.length === 1) {
      e.preventDefault();
    } else if (isTabPressed(e) && e.shiftKey) {
      // If user tabbing backward from the first focusable element
      // then move to the last focusable element.
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
    } else if (isTabPressed(e)) {
      // If user tabbing forward from last focusable element
      // then to the first focusable element
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    }
  });

  // Attach listener for clicks on document
  docBodyHidden.addEventListener('click', (e) => {
    // If mask is clicked then hide the modal
    if (isMaskClicked(e)) {
      e.preventDefault();
      hideModal(modal, focusedBodyEl);
    }
  });
};

const setupCancelEl = (modal, modalName, focusedBodyEl) => {
  // Look for cancel elements
  getElements(`[data-sprk-modal-cancel="${modalName}"]`, (cancel) => {
    // Show/Hide the modal and mask pair when cancel is clicked
    cancel.addEventListener('click', (e) => {
      e.preventDefault();
      hideModal(modal, focusedBodyEl);
    });
  });
};

const setupModals = () => {
  getElements('[data-sprk-modal-trigger]', (modalTrigger) => {
    // Add click listener to each modal trigger found
    modalTrigger.addEventListener('click', (event) => {
      // Grab active element to send focus back to when modal closes
      const focusedBodyEl = document.activeElement;
      // Grab value of modal data-attr to get the trigger's corresponding modal name
      const modalName = modalTrigger.getAttribute('data-sprk-modal-trigger');
      event.preventDefault();
      // Grab the corresponding modal with same attr value
      getElements(`[data-sprk-modal="${modalName}"]`, (modal) => {
        // Show the modal that was clicked
        showModal(modal, focusedBodyEl);
        focusFirstModalEl(modal);
        setupCancelEl(modal, modalName, focusedBodyEl);
        handleModalEvents(modal, focusedBodyEl);
      });
    });
  });
};

export { setupModals, showModal, hideModal };
