/*
モーダル
 */
'use strict';
export class Modal {
  constructor() {
    this.$html = $('html');
    this.$contents = $('.dynabook-2025__main');
//    this.classIsModal = 'is-modal';
//    this.classIsBodyBar = 'is-bodyBar';
    this.$modalBtn = $('.is-modalBtn');
    this.modalArr = {};

    this.curModalTarget = '';
    this.$curFocusedObj = '';

    this.closeFocusFlg = false;

    if(this.$modalBtn[0]){
      this.init();
    }
  }

  init(){
    this.$contents.append(`
      <div class="js-modal--wrapper" data-bgColor="">
        <div class="js-modal--bg" tabindex="0"></div>
        <div class="js-modal">
          <div class="js-modal--inner">
          </div>
          <button type="button" class="c-btn__linkBase-white u-hover-bg-white u-hover-img-bg-cover js-modal--close">
            <span class="c-ico__close">閉じる</span>
          </button>
        </div>
      </div>
    `);

    this.$modal = $('.js-modal');
    this.$modalWrapper = $('.js-modal--wrapper');
    this.$modalInner = $('.js-modal--inner');
    this.$modalClose = $('.js-modal--close');
    this.$modalBg = $('.js-modal--bg');

    this.$modalClose.add(this.$modalBg).on('click', (e) => {
      e.preventDefault();
      this.closeModal();
    });

    this.$modalClose.on('focus', (e) => {
      this.closeFocusFlg = true;
    });

    this.$modalClose.on('blur', (e) => {
      this.closeFocusFlg = false;
    });

    this.$modalClose.on('keydown', (e) => {
      if(this.closeFocusFlg && e.key === 'Tab' && !e.shiftKey){
        this.closeModal();
      }
    });

    this.$modalBg.on('focus', (e) => {
      this.closeModal();
    });

    this.$modalBtn.each((i, el) => {
      const $btn = $(el)
      ;

      let id = $btn.attr('id')
      , modalTarget = $btn.attr('data-modalTarget')
      ;

      if(!id){
        id = `js-modalBtn-${i}`;
        $btn.attr('id', id);
      }

      this.modalArr[id] = {
        '$btn':$btn
        , 'id':id
        , 'modalTarget':modalTarget
      }

      $btn.on('click', (e) => {
        e.preventDefault();

        const w = $(window).width();
        if ((w <= 780 && $btn.hasClass('is-modal-pc')) || (w > 780 && $btn.hasClass('is-modal-sp'))) {
          return false;
        };
        this.$curFocusedObj = $btn;
        this.onModal(id);
      });

    })


  }

  onModal(id){
    const arr = this.modalArr[id]
    , $$focus = () => {
      this.$modalInner.find('.p-dynabook-2025__busProduct__gallery--list').each((j, el2) => {
        const activeFlg = $(el2).hasClass('is-active');

        $(el2).find('.slick-dots').find('li').each((k, el3) => {
          $(el3).on('keydown', (e) => {
            if(e.key === 'Enter'){
              $(el3).trigger('click');
            }
          });

          if(activeFlg){
            $(el3).attr('tabindex', '0');
            if($(el3).hasClass('slick-active')){
              $(el3).focus();
            }
          }else{
            $(el3).attr('tabindex', '-1');
          }
        });
      });

    }
    ;

    $(arr['modalTarget']).clone(true).appendTo(this.$modalInner);

    if(this.$modalInner.find('.p-dynabook-2025__busProduct__gallery--list')[0]){

      this.$modalWrapper.attr('data-bgColor', 'bg-busProduct');

      this.$modalInner.find('.p-dynabook-2025__busProduct__gallery--list').each((i, el) => {
        if($(el).find('.js-carousel')[0]){
          const $carousel = $(el).find('.js-carousel')
          ;

          let _classList = $(el).attr('class').split(' ')
          ;

          $carousel.slick({
            slidesToShow: 1,
            centerMode:true,
            centerPadding: '0px',
            arrows:false,
            dots:true,
            accessibility:true,
            customPaging: function(slick,index) {
              const thumb = slick.$slides.eq(index).find('img').attr('src');
              return `<img src="${thumb}"/>`;
            }
          });

          if(_classList.indexOf(arr['$btn'].attr('data-galleryTarget').replace('.', '')) > -1 && arr['$btn'].attr('data-carouselIndex')){
            $carousel.slick("slickGoTo", arr['$btn'].attr('data-carouselIndex'), false);
          }

        }

      })

      if(arr['$btn'].attr('data-galleryTarget')){
        this.$modalInner.find(`.p-dynabook-2025__busProduct__gallery--search--type`).removeClass('is-active');
        this.$modalInner.find(`.js-tab[data-target^="${arr['$btn'].attr('data-galleryTarget')}"]`).addClass('is-active');
        this.$modalInner.find(`.p-dynabook-2025__busProduct__gallery--list`).removeClass('is-active');
        this.$modalInner.find(`${arr['$btn'].attr('data-galleryTarget')}`).addClass('is-active');
      }

      $$focus();
      this.$modalInner.find('.js-tab').on('click', () => {
        $$focus();
      })
    }

    this.$modalWrapper.addClass('is-on');

  }
  
  closeModal(){
    this.$modalWrapper.removeClass('is-on');
    setTimeout(() => {
      this.$modalInner.empty();
    }, 300);
    this.$curFocusedObj.focus();
    this.$curFocusedObj = '';
    this.closeFocusFlg = false;

  }
  
}
export default Modal;
