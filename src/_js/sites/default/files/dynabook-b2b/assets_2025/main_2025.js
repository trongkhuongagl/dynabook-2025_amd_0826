'use strict';
import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import Modal from './components/modules/Modal';
import ModalYoutube from './components/modules/ModalYoutube';
import { gsap } from 'gsap';

var Main;
(function (Main) {
  class Page extends Base.PageCore {

    constructor() {
      super('_MAIN');

      this.$kv = $('.p-dynabook-2025__kv--list')
      this.$pickup = $('.p-dynabook-2025__pickup--list')
      this.$movie = $('.p-dynabook-2025__movie--list')
      this.$helpful = $('.p-dynabook-2025__helpful--list')
      this.$btnScene = $('.js-scene-btn')

      this.$tab = $('.js-tab');
      this.$tab_s = $('.js-tab-s');
      this.$tab_l = $('.js-tab-l');

      this.onInit();

    }
    onInit() {
      super.onInit();
      this.newCreate();
      $(window).on(Config.EVENT_LOADED, this.onLoaded.bind(this));
      $(window).on(Config.EVENT_MQ_CHANGE, this.onMqChange.bind(this));
      this.$tab.on('click', this.onTab.bind(this));
      this.$tab_s.on('click', this.onTab_s.bind(this));
      this.$tab_l.on('click', this.onTab_l.bind(this));
      this.$btnScene.on('click', this.onScene.bind(this));
      // this.btnAccordion.on('click', this.onToggle.bind(this));
      
    }
    onLoaded() {
      super.onLoaded();
      this.onResize();
      this.onSlickStart_kv();
      this.onSlickStart_pickup();
      this.onSlickStart_movie();
      this.onSlickStart_helpful();
      // gsap.to('h1',0.5,{alpha:0,duration:2});
    }
    /*
      インスタンス作成
     */
    newCreate() {
      new Modal();//モーダル
      new ModalYoutube();//モーダル
      // new Accordion();//アコーディオン
      // new TestPromise();
    }
    onResize() {
      super.onResize();
    }

    onMqChange() {
      // console.log('MQ--Main',Model.data.modelMq);
    }

    onTab(e) {
      e.preventDefault();
      const $btn = $(e.currentTarget);
      const targetId = $btn.attr('data-target');
      console.log(targetId)
      // $('.p-top-2025-search__area').removeClass('is-active');
      // $('.p-top-2025-search__btn--u').removeClass('is-active');
      console.log('test');
      if($('.p-top-2025-search__btn--ui')[0]){
        this.onTabChange($btn, $('#' + targetId), ['.p-top-2025-search__area', '.p-top-2025-search__btn--ui']);
      }else{
        this.onTabChange($btn, $('#' + targetId), [$btn.attr('data-tabContents'), $btn.attr('data-lisetList')]);
      }
    }

    onTab_s(e) {
      e.preventDefault();
      const $btn = $(e.currentTarget);
      const targetId = $btn.attr('data-target');
      this.onTabChange($btn, $('#' + targetId), ['.p-top-2025-edu__tab--btn', '.p-top-2025-edu__contents'])
    }

    onTab_l(e) {
      e.preventDefault();
      console.log('--click');
      const $btn = $(e.currentTarget);
      const targetId = $btn.attr('data-target');
      this.onTabChange($btn, $('#' + targetId), ['.p-top-2025-lineup__tab--btn', '.p-top-2025-lineup__wrap'])
    }

    onTabChange($btn, $contents, lisetList) {
      for (var i = 0; i < lisetList.length; i++) {
        $(lisetList[i]).removeClass('is-active');
      }

      $btn.addClass('is-active')
      $contents.addClass('is-active')
    }

    sceneInit(){
      
    }

    onScene(e) {
      const $wrap = $('.p-top-2025-scene__wrap');
      const $btn = $(e.currentTarget);
      const data = $btn.attr('data-scene');
      this.$btnScene.removeClass('is-active');
      $btn.addClass('is-active');
      console.log('data', data)

      if (data === 'all') {
        $wrap.removeClass('is-sort');
      } else {
        $wrap.addClass('is-sort');
      }

      $wrap.attr('id', '').attr('id', 'is-'+data);

      $('.p-top-2025-scene__item .c-productCard__popup').matchHeight();
      $('.p-top-2025-scene__item .c-productCard__col').matchHeight();

    }

    onSlickStart_kv() {
      this.$kv.slick(
        {
          arrows: false,
          dots: false,
          accessibility: false,
          // centerMode: true,
          slidesToShow: 1,
          responsive: [{
            breakpoint: 780,
            settings: {
              slidesToShow: 1,
              centerMode: false,
            }
          }]
          // centerPadding: '50px',
        }

      );

      this.$kv.on('swipe', function (event, slick, direction) {
        console.log(direction);
        $('.p-dynabook-2025__kv--item').attr({ 'aria-hidden': 'false' })
        // left
      });

      // エッジにぶつかった
      this.$kv.on('edge', function (event, slick, direction) {
        console.log('edge was hit')
      });


      // $('.cm-box__ui--left').on('click', (e) => {
      //   this.$kv.slick('slickPrev');
      // })

      // $('.cm-box__ui--right').on('click', (e) => {
      //   this.$kv.slick('slickNext');
      // })

      // this.$kv.on('afterChange', function (event, slick, currentSlide) {
      //   $('.cm-th__li').removeClass('is-active')
      //   $('.cm-th__li').eq(currentSlide).addClass('is-active')
      //   console.log(currentSlide)
      // });

      // $('.cm-th__li').on('click',(e)=>{
      //   const $btn = $(e.currentTarget);
      //   this.$kv.slick('slickGoTo', $btn.index(), false);
      // })
    }

    onSlickStart_pickup() {
      this.$pickup.slick(
        {
          arrows: false,
          // centerMode: true,
          slidesToShow: 3,
          responsive: [{
            breakpoint: 780,
            settings: {
              slidesToShow: 1,
              centerMode: false,
            }
          }]
          // centerPadding: '50px',
        }

      );


      // $('.cm-box__ui--left').on('click', (e) => {
      //   this.$kv.slick('slickPrev');
      // })

      // $('.cm-box__ui--right').on('click', (e) => {
      //   this.$kv.slick('slickNext');
      // })

      // this.$kv.on('afterChange', function (event, slick, currentSlide) {
      //   $('.cm-th__li').removeClass('is-active')
      //   $('.cm-th__li').eq(currentSlide).addClass('is-active')
      //   console.log(currentSlide)
      // });

      // $('.cm-th__li').on('click',(e)=>{
      //   const $btn = $(e.currentTarget);
      //   this.$kv.slick('slickGoTo', $btn.index(), false);
      // })
    }

    onSlickStart_helpful() {
      this.$helpful.slick(
        {
          arrows: false,
          // centerMode: true,
          slidesToShow: 4,
          responsive: [{
            breakpoint: 780,
            settings: {
              slidesToShow: 1,
              centerMode: false,
            }
          }]
          // centerPadding: '50px',
        }

      );


      // $('.cm-box__ui--left').on('click', (e) => {
      //   this.$kv.slick('slickPrev');
      // })

      // $('.cm-box__ui--right').on('click', (e) => {
      //   this.$kv.slick('slickNext');
      // })

      // this.$kv.on('afterChange', function (event, slick, currentSlide) {
      //   $('.cm-th__li').removeClass('is-active')
      //   $('.cm-th__li').eq(currentSlide).addClass('is-active')
      //   console.log(currentSlide)
      // });

      // $('.cm-th__li').on('click',(e)=>{
      //   const $btn = $(e.currentTarget);
      //   this.$kv.slick('slickGoTo', $btn.index(), false);
      // })
    }

    onSlickStart_movie() {
      this.$movie.slick(
        {
          arrows: false,
          // centerMode: true,
          slidesToShow: 1,
          responsive: [{
            breakpoint: 780,
            settings: {
              slidesToShow: 1,
              centerMode: false,
            }
          }]
          // centerPadding: '50px',
        }

      );


      // $('.cm-box__ui--left').on('click', (e) => {
      //   this.$kv.slick('slickPrev');
      // })

      // $('.cm-box__ui--right').on('click', (e) => {
      //   this.$kv.slick('slickNext');
      // })

      // this.$kv.on('afterChange', function (event, slick, currentSlide) {
      //   $('.cm-th__li').removeClass('is-active')
      //   $('.cm-th__li').eq(currentSlide).addClass('is-active')
      //   console.log(currentSlide)
      // });

      // $('.cm-th__li').on('click',(e)=>{
      //   const $btn = $(e.currentTarget);
      //   this.$kv.slick('slickGoTo', $btn.index(), false);
      // })
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
