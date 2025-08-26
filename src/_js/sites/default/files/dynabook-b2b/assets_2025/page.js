'use strict';
import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import { gsap } from 'gsap';

var Main;
(function (Main) {
  class Page extends Base.PageCore {

    constructor() {
      super('_PAGE');
      this.onInit();
    }
    onInit() {
      super.onInit();
      $(window).on(Config.EVENT_LOADED, this.onLoaded.bind(this));
      $(window).on(Config.EVENT_MQ_CHANGE, this.onMqChange.bind(this));
      this.newCreate();
    }
    onLoaded() {
      super.onLoaded();
      this.onResize();
    }
    /*
      インスタンス作成
     */
    newCreate() {
    }
    onResize() {
      super.onResize();
    }

    onMqChange(){
      // console.log('MQ--Page2',Model.data.modelMq);
    }
  } //class
  Main.Page = Page;
})(Main || (Main = {}));
/**
 * DOM読み込み完了後
 */
document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOMContentLoaded');
  if (!window.console) {
    window.console = { log: function (msg) { }, };
  }
  Model.data.rootApp = new Main.Page();
}, false);
/**
 * 全ロード完了後
 */
window.addEventListener('load', () => {
  $(window).trigger(Config.EVENT_LOADED);
}, false);
