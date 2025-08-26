'use strict';
import Config from './Config';
var Model;
(function (Model) {
  class data {
    /**
     * getter:メディアクエリー
     */
    static get modelMq() {
      return this.mq;
    }
    /**
     * setter:メディアクエリー
     * Triggerイベント:MQ_CHANGE
     */
    static set modelMq(value) {
      this.mq = value;
      // console.log(`mode(model):${this.modelMq}`);
      $(window).trigger(Config.EVENT_MQ_CHANGE, [this.modelMq]);
    }
  }
  data.isMobile = false; //モバイルデバイス
  data.mq = ''; //メディアクエリー
  Model.data = data;
})(Model || (Model = {}));
export default Model;