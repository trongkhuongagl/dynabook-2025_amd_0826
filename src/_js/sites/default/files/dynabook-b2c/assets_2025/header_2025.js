'use strict';
import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import MegaDropMenu from './components/modules/MegaDropMenu';
import { gsap } from 'gsap';

var Header;
(function (Header) {
  class Page extends Base.PageCore {

    constructor() {
      super('_HEADER');
      this.megaDropMenu = null;
      this.onInit();
      // console.log('--header---');
      
    }
    onInit() {
      super.onInit();
      this.newCreate();
      $(window).on(Config.EVENT_LOADED, this.onLoaded.bind(this));
      $(window).on(Config.EVENT_MQ_CHANGE, this.onMqChange.bind(this));
      // console.log('++++')
      $(window).on('scroll', this.onScroll.bind(this));
      if ($('.p-2025-header').length>0) {
        $('body').addClass('reset-margin_padding-2025').css({'padding-top':'100px','margin-top':'500px'})
        $('.l-container').addClass('dynabook-2025__main');
      }
    }
    onLoaded() {
      super.onLoaded();
      this.onResize();
    }
    /*
      インスタンス作成
     */
    newCreate() {
      this.megaDropMenu = new MegaDropMenu();//メガドロップメニュー
    }
    onResize() {
      super.onResize();
      this.onScroll();
    }

    onMqChange(){
      // console.log('MQ--Page2',Model.data.modelMq);
      this.megaDropMenu.onReset();
    }
    onScroll(){
      // console.log($(window).scrollTop(),$('.p-2025-header__block--level-0').height());
      if(Model.data.modelMq !== 'SP'){
        if(Number($(window).scrollTop()) >  Number($('.p-2025-header__block--level-0').height())){
          $('.p-2025-header').addClass('is-level-0-h');
        }else{
          $('.p-2025-header').removeClass('is-level-0-h');
        };
      }else{
        $('.p-2025-header').removeClass('is-level-0-h');
      }
    }
  } //class
  Header.Page = Page;
})(Header || (Header = {}));
/**
 * DOM読み込み完了後
 */
document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOMContentLoaded');
  if (!window.console) {
    window.console = { log: function (msg) { }, };
  }
  Model.data.rootApp = new Header.Page();
}, false);
/**
 * 全ロード完了後
 */
window.addEventListener('load', () => {
  $(window).trigger(Config.EVENT_LOADED);
}, false);
