/*
メガドロップダウンメニュー
 */
'use strict';
import Model from '../../global/Model';
export class MegaDropMenu {
  constructor() {
    console.log('---MegaDropMenu+');
    this.$megadrop = $('.js-megadrop .js-megadrop-target');
    this.$header = $('.p-2025-header');
    this.$megadropContent = $('.js-megadrop-content');
    this.$btnOpen = $('.js-megadrop-btn--open');
    this.$btnClose = $('.js-megadrop-btn--close');
    this.$btnSeachOpen = $('.js-globalSeach-btnOpen');
    this.$btnSeachClose = $('.js-globalSeach-btnClose');
    this.$globalSeach = $('.p-2025-header__globalSeach');
    this.$btnBackMenu = $('.js-megadrop-btn--back');
    this.$btnTextSeach = $('.p-2025-header__globalSeach--btn');
    this.$specs = $('.js-specs');
    this.$btnSpecs = $('.js-specs-btn');
    this.$megadrop.on('mouseenter', this.onMouseEnter.bind(this));
    this.$megadrop.on('mouseleave', this.onMouseLeave.bind(this));
    this.$btnOpen.on('click', this.onBtnOpen.bind(this));
    this.$btnClose.on('click', this.onBtnClose.bind(this));
    this.$btnSeachOpen.on('click', this.onBtnSeachOpen.bind(this));
    this.$btnSeachClose.on('click', this.onBtnSeachClose.bind(this));
    this.$megadrop.find('.js-target').on('click', this.onClickMegadrop.bind(this));
    this.$btnBackMenu.on('click', this.onBtnBackMenu.bind(this));
    this.$btnTextSeach.on('click', this.onBtnTextSeach.bind(this));
    this.$btnSpecs.on('click', this.onBtnSpecs.bind(this));
  }

  onMouseEnter(e) {
    // e.preventdefault();
    // console.log('----onMouseEnter');
    if (Model.data.modelMq !== 'SP') {
      const $btn = $(e.currentTarget);
      $btn.addClass('is-active');
      $btn.find('.js-megadrop-content').stop().slideDown();
    }
  }

  onMouseLeave(e) {
    // e.preventdefault();
    // console.log('----onMouseLeave');
    if (Model.data.modelMq !== 'SP') {
      this.$megadrop.removeClass('is-active');
      const $btn = $(e.currentTarget);
      $btn.find('.js-megadrop-content').stop().slideUp();
    }
  }

  onBtnOpen(e) {
    this.onOpen();
  }

  onBtnClose(e) {
    this.onClose();
  }

  onOpen() {
    this.$header.addClass('is-sp-open');
    $('body').addClass('is-sp-menu-open-fix');
  }

  onClose() {
    this.onReset();
  }

  onClickMegadrop(e) {
    if (Model.data.modelMq === 'SP') {
      e.preventDefault();
      const $btn = $(e.currentTarget);
      $btn.closest('.js-megadrop-target ').addClass('is-under');
      // return false;
    }
  }

  onBtnSeachOpen(){
     this.$globalSeach.addClass('is-active');
  }

  onBtnSeachClose(){
    this.$globalSeach.removeClass('is-active');
  }

  onBtnBackMenu(){
    this.$megadrop.removeClass('is-under')
  }

  onBtnTextSeach(e){
    e.preventDefault();
    const $btn = $(e.currentTarget);
    // const word = $('.p-2025-header__globalSeach--input').val();
    const word = $btn.prev().find('.p-2025-header__globalSeach--input').val();
    const encordWord = encodeURIComponent(word)
    console.log('word:',encordWord);
    // location.href='/site-search/index.html?keyword='+encordWord;
  }

  onBtnSpecs(e){
    e.preventDefault();
    const checkList = [];
    const $label = $('.c-checkbox_label');
    let word = '';
    for (var i = 0; i < $label.length; i++) {
      const $target = $label.eq(i).find('input');
      const isCheck = $target.prop("checked");
      if(isCheck === true){
        const name = $target.attr('name')
        const value = $target.attr('value')
        word +='&'+name+'='+value;
      }
      
    }
    console.log(word)
    const encordWord = encodeURIComponent(word)
    location.href="/search/individual/index.html?site=dyc"+word;
  }

  onReset() {
    console.log('--reset')
    this.$megadrop.find('.js-megadrop-content').removeAttr('style');
    this.$megadrop.removeClass('is-under');
    this.$header.removeClass('is-sp-open');
    this.$globalSeach.removeClass('is-active');
    $('body').removeClass('is-sp-menu-open-fix');
  }

 
}
export default MegaDropMenu;
