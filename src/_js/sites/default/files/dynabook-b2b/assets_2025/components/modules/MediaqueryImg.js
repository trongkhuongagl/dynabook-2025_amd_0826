/*
トリガー:img要素にimg_mediaqクラスを付ける。
HTML 「data-path:なし」PC以外はプレフィックス付き画像
HTML 「data-path:serial」PC以外は下層フォルダ
HTML 「data-path:parallel」同階層に振り分けられた個別フォルダ
 */
'use strict';
export class MediaqueryImg {
  constructor() {
    this.modePC = 'pc';
    this.modeTB = 'tb';
    this.modeSP = 'sp';
    this.mqClass = '.img_mediaq';
  }
  mqImgSet(value = this.modePC) {
    const _media = value.toLowerCase();
    const _scope = this;
    $(this.mqClass).each(function () {
      const _data_path = $(this).data('path');
      const _pathes = String($(this).data('src'));
      const _file = _pathes.split('/')[_pathes.split('/').length - 1];
      const _path = _pathes.split(_file)[0];
      const _fileName = _file.slice(0, -4);
      const _type = _pathes.split(_fileName)[1];
      let _destPath = '';
      _destPath = _path + _fileName + _type;
      if (_data_path) {
        if (_data_path === 'serial') {
          if (_media === _scope.modeTB || _media === _scope.modeSP) {
            //PC以外は下層フォルダ
            _destPath = _path + _media + '/' + _fileName + _type;
          }
        }
        else {
          //同階層に振り分けられた個別フォルダ
          _destPath = _path + _media + '/' + _fileName + _type;
        }
      }
      else {
        //PC以外はプレフィックス付き画像
        if (_media === _scope.modeTB || _media === _scope.modeSP) {
          _destPath = _path + _fileName + '_' + _media + _type;
        }
      }
      // console.log('パス:' + _path);
      // console.log('ファイル名称:'+_fileName);
      // console.log('タイプ:'+_type);
      // console.log(_destPath);
      $(this).attr('src', _destPath);
    });
  }
  mqPictureSet(value = this.modePC) {
    const _targetClass = '.js-img_picture';
    $(_targetClass).each(function () {
      const img = $(this).find(_targetClass + '_' + value.toLowerCase());
      const path = img.attr('srcset');
      // console.log(`パス:${path}`);
      $(this).find('img').attr('src', path);
    });
  }
}
export default MediaqueryImg;
