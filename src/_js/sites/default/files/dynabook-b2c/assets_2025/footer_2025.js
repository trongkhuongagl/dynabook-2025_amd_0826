'use strict';
import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import AccordionSP from './components/modules/AccordionSP';
import { gsap } from 'gsap';

var Footer;
(function (Footer) {
  class Page extends Base.PageCore {

    constructor() {
      super('_FOOTER');
      this.footerAcc = null;
      this.onInit();

    }
    onInit() {
      super.onInit();
      $(window).on(Config.EVENT_LOADED, this.onLoaded.bind(this));
      $(window).on(Config.EVENT_MQ_CHANGE, this.onMqChange.bind(this));
      this.newCreate();

      $('.js-page-top').on('click', () => {
        $('body,html').animate({
          scrollTop: 0
        }, 500);
        return false;
      });
    }
    onLoaded() {
      super.onLoaded();
      this.onResize();
    }
    /*
      インスタンス作成
     */
    newCreate() {
      this.footerAcc = new AccordionSP;
      this.footerAcc.onReset();
    }
    onResize() {
      super.onResize();
    }

    onMqChange() {
      // console.log('MQ--Page2',Model.data.modelMq);
      this.footerAcc.onReset();
    }
  } //class
  Footer.Page = Page;
})(Footer || (Footer = {}));
/**
 * DOM読み込み完了後
 */
document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOMContentLoaded');
  if (!window.console) {
    window.console = { log: function (msg) { }, };
  }
  Model.data.rootApp = new Footer.Page();
}, false);
/**
 * 全ロード完了後
 */
window.addEventListener('load', () => {
  $(window).trigger(Config.EVENT_LOADED);
}, false);
