'use strict';
var Config;
(function (Config) {
  /**
   * プレフィックス
   */
  Config.PREFIX = ''; //サイズ:タブレット
  /**
   * ウィンドウサイズ:サイズ幅
   */
  Config.MQ_TB = 780; //サイズ:タブレット
  Config.MQ_SP = 780; //サイズ:サイズ
  /**
   * ウィンドウサイズ:名称
   */
  Config.MODE_PC = 'PC'; //ウィンドウサイズ：パソコン
  Config.MODE_TB = 'TB'; //ウィンドウサイズ：タブレット
  Config.MODE_SP = 'SP'; //ウィンドウサイズ：スマホ
  /**
  * イベント:名称
  */
  Config.EVENT_MQ_CHANGE = 'EVENT_MQ_CHANGE'; //メディアクエリー変更
  Config.EVENT_LOADED = 'EVENT_LOADED'; //全ファイル読み込み完了
  /**
   * CSS:クラス名
   */
  Config.CLASS_IS_MOBILE = 'is-MobileOS'; //モバイルデバイス(Android・iOSのタブレットとスマホ)
  Config.CLASS_IS_LANDSCAPE = 'is-landscape'; //横幅の方が大きい場合
})(Config || (Config = {}));

export default Config;