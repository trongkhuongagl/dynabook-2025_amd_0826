'use strict';
import Config from '../../global/Config';
import Model from '../../global/Model';
import MediaqueryImg from '../modules/MediaqueryImg';
import BrowseDevice from '../modules/utils/BrowseDevice';
var Base;
(function (Base) {
  class PageCore {
    constructor(prefix) {
      Config.PREFIX = prefix;
      Config.EVENT_LOADED = Config.EVENT_LOADED+Config.PREFIX;
      Config.EVENT_MQ_CHANGE = Config.EVENT_MQ_CHANGE+Config.PREFIX;
      // public mq: String = 'PC';
      this.$window = $(window);
      this.$html = $('html');
      this.$body = $('body');
      this.fixMq = '';
      this.tempMq = '';
      this.mq_tb = Config.MQ_TB;
      this.mq_sp = Config.MQ_SP;
      this.mode_pc = Config.MODE_PC;
      this.mode_tb = Config.MODE_TB;
      this.mode_sp = Config.MODE_SP;
      this.mediaqueryImg = new MediaqueryImg();
      this.mqlTB = window.matchMedia(`screen and (min-width: ${this.mq_sp + 1}px) and (max-width: ${this.mq_tb}px)`);
      this.mqlSP = window.matchMedia(`screen and (max-width: ${this.mq_sp}px)`);
      Model.data.isMobile = !BrowseDevice.judgeBrowse().isPc ? true : false;
    }
    onInit() {
      if (Model.data.isMobile)
        this.$html.addClass(Config.CLASS_IS_MOBILE);
      //ブレークポイント切り替え
      this.onBreakPoint();
      this.mqlTB.addListener(this.onBreakPoint.bind(this));
      this.mqlSP.addListener(this.onBreakPoint.bind(this));
      //リサイズ
      this.onResize();
      this.$window.on('resize', () => {
        this.onResize();
      });
    }
    onLoaded() {
      // console.log('All Load:complete');
    }
    onResize() {
      const dw = window.innerWidth ? window.innerWidth : $(window).width();
      const dh = window.innerHeight ? window.innerHeight : $(window).height();
      this.onClassChange(dw, dh);
    }
    /*
    * ブレークポイント
     */
    onBreakPoint() {
      if (this.mqlSP.matches) {
        this.fixMq = this.mode_sp;
      }
      else if (this.mqlTB.matches) {
        this.fixMq = this.mode_tb;
      }
      else {
        this.fixMq = this.mode_pc;
      }
      if (this.fixMq !== this.tempMq) {
        //Model更新(mode);
        Model.data.modelMq = this.fixMq;
        // console.log('ブレークポイント:'+Model.data.modelMq);
        //レスポンシブ画像切り替え
        this.mediaqueryImg.mqImgSet(this.fixMq);
        if (BrowseDevice.judgeBrowse().isIE11) {
          //pictureタグ用
          this.mediaqueryImg.mqPictureSet(this.fixMq);
        }
        this.tempMq = this.fixMq;
        this.onResize();
      }
    }
    /*
    * クラスチェンジ
     */
    onClassChange(dw, dh) {
      if (dw > dh && Model.data.isMobile) {
        this.$html.addClass(Config.CLASS_IS_LANDSCAPE);
      }
      else {
        this.$html.removeClass(Config.CLASS_IS_LANDSCAPE);
      }
    }
  }
  Base.PageCore = PageCore;
})(Base || (Base = {}));
export default Base;
