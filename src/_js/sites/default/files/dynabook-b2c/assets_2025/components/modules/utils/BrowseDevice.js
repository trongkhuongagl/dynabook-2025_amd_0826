/*
*OS・ブラウザ判定
*/
'use strict';
export class BrowseDevice {
  constructor() {
  }
  static judgeOS() {
    const ua = navigator.userAgent;
    const isMobile = (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) ? true : false;
    return isMobile;
  }
  static judgeBrowse() {
    const ua = navigator.userAgent.toLowerCase();
    const ver = navigator.appVersion.toLowerCase();
    // IE(11以外)
    const isMSIE = (ua.indexOf('msie') > -1) && (ua.indexOf('opera') == -1);
    // IE8
    const isIE8 = isMSIE && (ver.indexOf('msie 8.') > -1);
    // IE9
    const isIE9 = isMSIE && (ver.indexOf('msie 9.') > -1);
    // IE10
    const isIE10 = isMSIE && (ver.indexOf('msie 10.') > -1);
    // IE11
    const isIE11 = (ua.indexOf('trident/7') > -1);
    // IE
    const isIE = isMSIE || isIE11;
    // Edge
    const isEdge = (ua.indexOf('edge') > -1);
    // Google Chrome
    const isChrome = (ua.indexOf('chrome') > -1) && (ua.indexOf('edge') == -1);
    // Firefox
    const isFirefox = (ua.indexOf('firefox') > -1);
    // Safari
    const isSafari = (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') == -1);
    // Opera
    const isOpera = (ua.indexOf('opera') > -1);
    let isMobile = false;
    let isTablet = false;
    let isPc = false;
    //デバイス判定
    const _ua = (function (u) {
      return {
        Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
          || u.indexOf("ipad") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
          || u.indexOf("kindle") != -1
          || u.indexOf("silk") != -1
          || u.indexOf("playbook") != -1,
        Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
          || u.indexOf("iphone") != -1
          || u.indexOf("ipod") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
          || u.indexOf("blackberry") != -1
      };
    })(window.navigator.userAgent.toLowerCase());
    if (_ua.Mobile) {
      //この中のコードはスマホにのみ適用
      isMobile = true;
    }
    else if (_ua.Tablet) {
      //この中のコードはタブレットにのみ適用
      isTablet = true;
    }
    else {
      //この中のコードはスマホ・タブレット以外に適用
      isPc = true;
    }
    const result = {
      isMSIE: isMSIE,
      isIE8: isIE8,
      isIE9: isIE9,
      isIE10: isIE10,
      isIE11: isIE11,
      isIE: isIE,
      isEdge: isEdge,
      isChrome: isChrome,
      isFirefox: isFirefox,
      isSafari: isSafari,
      isOpera: isOpera,
      isMobile: isMobile,
      isTablet: isTablet,
      isPc: isPc
    };
    return result;
  }
}
export default BrowseDevice;
