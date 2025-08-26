/*
アコーディオン
 */
'use strict';
import Model from '../../global/Model';
export class AccordionSP {
  constructor() {
    this.init();
  }

  init() {
    this.btnAccordion = $('.js-accordion-title-sp');
    
    
  }

  onToggle(e) {
    if(Model.data.modelMq === 'SP'){
      const $btn = $(e.currentTarget);
      $btn.toggleClass('is-active');
      $btn.next().toggleClass('is-open');
      $btn.attr({'aria-expanded':false});
      $('.c-accordion__content--sp').attr({'aria-hidden':true});
      $('.c-accordion__content--sp a').attr({'tabIndex':'-1'});
      if($btn.hasClass('is-active')){
        $btn.attr({'aria-expanded':true});
        $('.c-accordion__content--sp.is-open').attr({'aria-hidden':false});
        $('.c-accordion__content--sp.is-open a').attr({'tabIndex':'auto'});
      } 
      return false;
    }
  }

  onToggleFocus(e){
    //  if(Model.data.modelMq === 'SP'){
    //   const $btn = $(e.currentTarget);
    //   $btn.addClass('is-active');
    //   $btn.next().addClass('is-open');
    //   return false;
    // }
  }

  onReset(){
    this.btnAccordion.removeClass('is-active');
    this.btnAccordion.next().removeClass('is-open');
    if(Model.data.modelMq === 'SP'){
      $('p.js-accordion-title-sp').replaceWith(function() {
        return $('<button class="p-2025-footer__baseTitele js-accordion-title-sp is-tagchange"></button>').html($(this).html());
      });
      this.btnAccordion = $('.js-accordion-title-sp');
      this.btnAccordion.on('click', this.onToggle.bind(this));
      this.btnAccordion.on('focus', this.onToggleFocus.bind(this));
      this.btnAccordion.attr({'aria-expanded':false});
      $('.c-accordion__content--sp').attr({'aria-hidden':true});
      $('.c-accordion__content--sp a').attr({'tabIndex':'-1'});
    }else{
      this.btnAccordion = $('.js-accordion-title-sp');
      this.btnAccordion.removeAttr ('aria-expanded');
      $('.c-accordion__content--sp').removeAttr ('aria-hidden');
      $('.c-accordion__content--sp a').removeAttr('tabIndex');
      $('button.is-tagchange').replaceWith(function() {
        return $('<p class="p-2025-footer__baseTitele js-accordion-title-sp"></p>').html($(this).html());
      });
    }
  }

}
export default AccordionSP;
