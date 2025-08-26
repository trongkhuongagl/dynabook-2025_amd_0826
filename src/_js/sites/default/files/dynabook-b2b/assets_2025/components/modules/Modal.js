/*
モーダル
 */
'use strict';
export class Modal {
  constructor() {
    this.$html = $('html');
    this.$contents = $('.dynabook-2025');
//    this.classIsModal = 'is-modal';
//    this.classIsBodyBar = 'is-bodyBar';
    this.$modalBtn = $('.is-modalBtn');
    this.modalArr = {};

    this.curModalTarget = '';

    if(this.$modalBtn[0]){
      this.init();
    }
  }

  init(){
    this.$contents.append(`
      <div class="js-modal--wrapper">
        <div class="js-modal">
          <div class="js-modal--inner">
          </div>
          <button type="button" class="js-modal--close">
            <span class="c-ico__close">閉じる</span>
          </button>
        </div>
        <div class="js-modal--bg"></div>
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
        this.onModal(id);
      });

    })


  }

  onModal(id){
    const arr = this.modalArr[id]
    ;

    $(arr['modalTarget']).clone(true).appendTo(this.$modalInner);

    if(this.$modalInner.find('.p-dynabook-2025__busProduct__gallery--list')[0]){

      this.$modalInner.find('.p-dynabook-2025__busProduct__gallery--list').each((i, el) => {
        if($(el).find('.js-carousel')[0]){
          const $carousel = $(el).find('.js-carousel');

          $carousel.slick({
            slidesToShow: 1,
            centerMode:true,
            arrows:false,
            dots:true,
            customPaging: function(slick,index) {
              const thumb = slick.$slides.eq(index).find('img').attr('src');
              return `<img src="${thumb}"/>`;
            }
          });

          if(arr['$btn'].attr('data-galleryTarget') === `#${$(el).attr('id')}` && arr['$btn'].attr('data-carouselIndex')){
            $carousel.slick("slickGoTo", arr['$btn'].attr('data-carouselIndex'), false);
          }

        }

      })

      if(arr['$btn'].attr('data-galleryTarget')){
        this.$modalInner.find(`.js-tab[data-target^="${arr['$btn'].attr('data-galleryTarget').replace('#', '')}"]`).trigger('click');
      }

    }

    this.$modalWrapper.addClass('is-on');

  }
  
  closeModal(){
    this.$modalWrapper.removeClass('is-on');
    setTimeout(() => {
      this.$modalInner.empty();
    }, 300);

  }
  
}
export default Modal;
