/*
アコーディオン
 */
'use strict';
export class Accordion {
  constructor() {
    this.init();
  }

  init() {
    this.btnAccordion = $('.js-accordion-title');
    this.btnAccordion.on('click', this.onToggle.bind(this));
  }

  onToggle(e) {
    const $btn = $(e.currentTarget);
    $btn.toggleClass('is-active');
    $btn.next().toggleClass('is-open');
  }

}
export default Accordion;
