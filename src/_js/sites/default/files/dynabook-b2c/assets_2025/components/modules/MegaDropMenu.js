/*
メガドロップダウンメニュー
 */
'use strict';
import Model from '../../global/Model';
import Config from '../../global/Config';
import AccordionHeaderSP from '../../components/modules/AccordionHeaderSP';
export class MegaDropMenu {
  constructor() {
    this.$megadrop = $('.js-megadrop .js-megadrop-target');
    this.$header = $('.p-2025-header');
    this.$megadropContent = $('.js-megadrop-content');
    this.$btnOpen = $('.js-megadrop-btn--open');
    this.$btnClose = $('.js-megadrop-btn--close');
    this.$btnMotionClose = $('.js-megadrop-btn--motionClose');
    this.$btnSeachOpen = $('.js-globalSeach-btnOpen');
    this.$btnSeachClose = $('.js-globalSeach-btnClose');
    this.$globalSeach = $('.p-2025-header__globalSeach');
    this.$btnBackMenu = $('.js-megadrop-btn--back');
    this.$btnTextSeach = $('.p-2025-header__globalSeach--btn');
    this.$inputSeach = $('.p-2025-header__globalSeach--input');
    this.$specs = $('.js-specs');
    this.$btnSpecs = $('.js-specs-btn');
    this.headerAcc = null;
    // this.$megadrop.on('mouseenter', this.onMouseEnter.bind(this));
    this.$megadrop.each((i, el) => {
      $(el).on('click', (e) => {
        this.onMouseEnter($(e.currentTarget));
      });
    })
    // this.$megadrop.on('mouseleave', this.onMouseLeave.bind(this));
    $('.l-container,.l-2025-footer').on('click', this.onMouseLeave.bind(this));
    $('.p-2025-header__btn').find('a').on('focus', this.onMegadropOut.bind(this));
    $('.p-2025-header__check--item').on('click',this.onMegaStay.bind(this))
    this.$btnOpen.on('click', this.onBtnOpen.bind(this));
    this.$btnClose.on('click', this.onBtnClose.bind(this));
    this.$btnSeachOpen.on('click', this.onBtnSeachOpen.bind(this));
    this.$btnSeachClose.on('click', this.onBtnSeachClose.bind(this));
    this.$megadrop.find('.js-target').on('click', this.onClickMegadrop.bind(this));
    this.$btnBackMenu.on('click', this.onBtnBackMenu.bind(this));
    this.$btnTextSeach.on('click', this.onBtnTextSeach.bind(this));
    this.$inputSeach.on('keypress',this.onPressSeach.bind(this));
    this.$btnSpecs.on('click', this.onBtnSpecs.bind(this));
    this.$btnMotionClose.on('click', this.onMotionClose.bind(this));

//    this.$megadrop.find('.js-target').on('focus', this.onMegadropFocus.bind(this));
    document.addEventListener('keyup', (e) => {
      if(e.key === 'Tab'){
        if($(':focus').hasClass('js-target') && $(':focus').parent().hasClass('js-megadrop-target')){
          this.onMouseEnter($(':focus').parent());
        };
      }
    });
    
    $(".p-2025-header__check--item input[type=checkbox]").on('keyup', this.onPressSelect.bind(this));

    this.dropDownTimeout;




this.testCounter = 0;
    this.onCurrentLinkChange();
    this.initCurrent();
    this.headerAcc = new AccordionHeaderSP;
    this.headerAcc.onReset();
    $(window).on(Config.EVENT_MQ_CHANGE, this.onMqChange.bind(this));
  }

  initCurrent(){
    const $Menu = $('.js-megadrop .js-megadrop-target');
    let pathName = location.pathname;
    // pathName = pathName.slice(1).slice(0, -1);
    // let pathNameList = pathName.split('/');
    // if(pathNameList.length >=3){
    //   pathName = pathNameList[0]+'/'+pathNameList[1];
    // }
    if(pathName === 'business' || pathName === 'personal') return;
    for (var i = 0; i < $Menu.length; i++) {
      const link = $Menu.eq(i).attr('data-current');
      if(link && pathName.includes(link)){
        this.$megadrop.removeClass('is-current');
        this.$megadrop.eq(i).addClass('is-current');
      }
    }
  }

  onMegadropFocus(e){
    if (Model.data.modelMq !== 'SP') {
      const $btn = $(e.currentTarget).closest('.js-megadrop-target');
      this.$megadrop.removeClass('is-active');
      $('.js-megadrop-content').removeAttr('style');
      this.onMegadropOpen($btn);
    }
  }

  onMegadropOut(e){
    if (Model.data.modelMq !== 'SP') {
      this.$megadrop.removeClass('is-active');
      $('.js-megadrop-content').removeAttr('style');
    }
  }

  onMouseEnter(btn) {
    // e.preventdefault();
    // console.log('----onMouseEnter');
    if (Model.data.modelMq !== 'SP') {
      const $btn = btn;
      // $btn.addClass('is-active');
      // $btn.find('.js-megadrop-content').stop().slideDown();

      if($btn.hasClass('is-active')){
        this.onMouseLeave();
      }else{
        this.onMegadropOpen($btn);
      }

    }
  }

  onMegadropOpen(btn){
    if (Model.data.modelMq !== 'SP') {

      let timeout = 0;

      if($('.js-megadrop-target.is-active')[0]){
        this.onMouseLeave();
        timeout = 400;
      }

      clearTimeout(this.dropDownTimeout)
      this.dropDownTimeout = setTimeout(() => {
        const $btn = btn;
        $btn.addClass('is-active');
        $btn.find('.js-megadrop-content').slideDown(300, 'swing', (e)=>{
          // const $target = $('.js-megadrop-target.is-active').find('.c-menu_contents');
          // console.log('****complete',$target.height());
          // $btn.find('.js-megadrop-content').height();
          // console.log('****header',this.$header.height());
          //  $btn.find('.js-megadrop-content').removeAttr('style');
          // if($(window).height() < this.$header.height()){

          // }
          // $target.height($target.height()+500)
        });
      }, timeout);

    }

  }

  onMouseLeave(e) {
    // e.stopPropagation();
//    const $currentBtn = $(e.currentTarget);
    if (Model.data.modelMq !== 'SP' && !$('.p-2025-header__globalSeach--input').is(':focus')) {
      $('.js-megadrop-target.is-active').find('.c-menu_contents').slideUp(300, 'swing', (e)=>{
      $('.js-megadrop-content').removeAttr('style');
      $('.js-megadrop-target.is-active').removeClass('is-active');
      });
    }
  }

  onMotionClose(e){
  // e.preventDefault();
  e.stopPropagation();
  if (Model.data.modelMq !== 'SP') {
      this.$megadrop.removeClass('is-active');
      const $btn = $(e.currentTarget);
      $('.js-megadrop-content').slideUp(300, 'swing');
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
    $('.js-megadrop-content').removeAttr('style');
    $('.js-megadrop-target.is-active').removeClass('is-active');
     this.$globalSeach.addClass('is-active');
  }

  onBtnSeachClose(){
    this.$globalSeach.removeClass('is-active');
  }

  onBtnBackMenu(){
    this.$megadrop.removeClass('is-under')
  }

  onPressSeach(e){
    const $input = $(e.currentTarget);
    if(e.keyCode === 13) {
      const isProduct = $input.hasClass('is-product');
      this.seachLocation($input.val(),isProduct);
    }
  }

  onPressSelect(e){
    const $input = $(e.currentTarget);
    if(e.keyCode === 13) {
      if($input.prop("checked")){
        $input.prop("checked", false);
      }else{
        $input.prop("checked", true);
      }
    }
  }

  onBtnTextSeach(e){
    e.preventDefault();
    // const word = $('.p-2025-header__globalSeach--input').val();
    const $btn = $(e.currentTarget);
    const word = $btn.prev().find('.p-2025-header__globalSeach--input').val();
    const isProduct =$btn.prev().find('.p-2025-header__globalSeach--input').hasClass('is-product');
    this.seachLocation(word,isProduct);
    // const encordWord = encodeURIComponent(word)
    // console.log('word:',encordWord);
    // location.href='/site-search/index.html?keyword='+encordWord;
  }

  seachLocation(val,isProduct){
    const word = val;
    const encordWord = encodeURIComponent(word)
    // console.log('word:',encordWord);
    // console.log('isProduct',isProduct)
    if(isProduct){
      location.href='/search/searchlist/index.html?modelNo='+encordWord;
    }else{
      location.href='/site-search/index.html?keyword='+encordWord;
    }
    
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
    // console.log(word)
    const encordWord = encodeURIComponent(word)
    location.href="https://dynabook.com/search/individual/index.html?site=dyc"+word;
  }

  onMegaStay(e){
    // e.preventDefault();
    const $btn = $(e.currentTarget);
    e.stopPropagation();
    $btn.find('.c-checkbox_label').removeClass('is-focus');
    // return;
  }

  onReset() {
    // console.log('--reset')
    this.$megadrop.find('.js-megadrop-content').removeAttr('style');
    this.$megadrop.removeClass('is-under');
    this.$header.removeClass('is-sp-open');
    this.$globalSeach.removeClass('is-active');
    $('body').removeClass('is-sp-menu-open-fix');
  }

 onMqChange() {
      // console.log('MQ--Page2',Model.data.modelMq);
      this.headerAcc.onReset();
}

  onCurrentLinkChange(){
    var t = window.location.href;
    var t2 = window.location.pathname;
    $('.p-2025-header .p-2025-header__base--list a').each(function () {
      // console.log('t:', t);
      // console.log('t2:', t2);
      // span ではなく a タグに対してのみ処理（念のためチェック）
      if ($(this).prop('tagName').toLowerCase() !== 'span') {
        var href = $(this).attr('href');
        if (href === t || href === t2) {
          $(this).replaceWith('<span>' + $(this).html() + '</span>');
        }
      }
    });
  }
}
export default MegaDropMenu;
