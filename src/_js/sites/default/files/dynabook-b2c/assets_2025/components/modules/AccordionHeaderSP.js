/*
アコーディオン
 */
'use strict';
import Model from '../../global/Model';
export class AccordionHeaderSP {
  constructor() {
    this.init();
  }

  init() {
    this.btnAccordion = $('.js-accordion-header-sp');
    this.btnAccordion.on('click', this.onToggle.bind(this));
  }

  onToggle(e) {
    if(Model.data.modelMq === 'SP'){
      const $btn = $(e.currentTarget);
      $btn.toggleClass('is-active');
      $btn.next().toggleClass('is-open');
      return false;
    }
  }

  onReset(){
    this.btnAccordion.removeClass('is-active');
    this.btnAccordion.next().removeClass('is-open');
  }

}
export default AccordionHeaderSP;
