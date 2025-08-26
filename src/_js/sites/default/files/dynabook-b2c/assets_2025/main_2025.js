'use strict';
import Model from './global/Model';
import Config from './global/Config';
import Base from './components/core/Base';
import Modal from './components/modules/Modal';
import ModalYoutube from './components/modules/ModalYoutube';
import Accordion from './components/modules/Accordion';
import Amd from './components/modules/Amd';
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
      this.$modalTel = $('.js-tel_side_modal')
      this.$btnTelModalOpen = $('.js-tel_side_modal-open')
      this.$btnTelModalClose = $('.js-tel_side_modal-close')

      this.$tab = $('.js-tab');
      this.$tab_s = $('.js-tab-s');
      this.$tab_l = $('.js-tab-l');
      this.latestYear = 0;
      this.newsParsData = [];
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
      this.$btnTelModalOpen.on('click', this.onTelModalOpen.bind(this));
      this.$btnTelModalClose.on('click', this.onTelModalClose.bind(this));
      // this.btnAccordion.on('click', this.onToggle.bind(this));




      $('a').each((i, el) => {
        const $s = $(el)
          , href = $s.attr('href')
          ;

        if ($s.attr('href')) {
          if (href.match(/^#/)) {
            $s.on('click', (e) => {
              e.preventDefault();
              this.onPageTo(href);
            });
          };
        };
      });


      this.onSlickStart_kv();



      if ($('.p-dynabook-2025__busProduct__gallery--pc')[0]) {
        this.onBusProduct__gallery();
      }
      if ($('.js-news-csv').length <= 0) (this.onNews());

      if(Boolean($('.js-news-csv').attr('data-mix'))){
        console.log('=======mix======');
         this.ajaxNews('data-dir','data-file',true);
        // this.ajaxNews('data-dir2','data-file2');
      }else{
        this.ajaxNews('data-dir','data-file');
      }
      

      //   $("#out, #text2").focus(function() {
      //   var id = $(this).attr("id");
      //   console.log("focus", id);
      // });

      $('.p-2025-header__col--list input').on('focus', (e) => {
        const $currentfocus = $(e.currentTarget);
        const $label = $currentfocus.closest('label');
        $('.p-2025-header__col--list label').removeClass('is-focus');
        $label.addClass('is-focus');
      });

    }
    onLoaded() {
      super.onLoaded();
      this.onResize();

      this.onSlickStart_pickup();
      this.onSlickStart_movie();
      this.onSlickStart_helpful();
      // gsap.to('h1',0.5,{alpha:0,duration:2});
      const $slide3_1 = $('.js-slider-3_1');
      for (var i = 0; i < $slide3_1.length; i++) {
        this.onSlickStart_3_1($slide3_1.eq(i));
      }

      const hash = location.hash;
      if (hash) {
        this.onPageTo(hash);
      }
      $('.js-matchHeight').matchHeight();
    }
    /*
      インスタンス作成
     */
    newCreate() {
      new Modal();//モーダル
      new ModalYoutube();//モーダル
      new Accordion();//アコーディオン
      // new TestPromise();
      if($('.js-init-target').hasClass('p-product-amd')){
        new Amd();
      }
    }
    onResize() {
      super.onResize();
    }

    onMqChange() {
      // console.log('MQ--Main',Model.data.modelMq);
    }

    ajaxNews(dataDir,dataFile,isLoop = false){
      if ($('.js-news-csv').length <= 0) return;
      const dir = $('.js-news-csv').attr(dataDir);
      const file = $('.js-news-csv').attr(dataFile) + '.csv';
      $.ajax({
        url: `/sites/default/files/${dir}/assets_2025/csv/${file}`
      }).done((data, textStatus, jqXHR) => {
        var csv = $.csv.toArrays(data);
        let tempList = this.newsParsData.concat(this.csv2json(csv[0], csv));
        // console.log(csv);
        // console.log(csv.length);
        this.newsParsData = tempList;
        console.log(this.newsParsData);
        if(isLoop){
           this.ajaxNews('data-dir2','data-file2');
        }else{
          this.addNewsHtml(this.newsParsData)
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      });
    }

    addNewsHtml(val){
      const maxNum = Number($('.js-news-csv').attr('data-max'));
      const isNavi = Boolean($('.js-news-csv').attr('data-navi'));
      let loopNum = 0;
      let loopCount = 1;
      let listCode = '';

      //日付順に並べる
      let  parsData = val.sort((a, b) => {
        const dateA = new Date(a.日付.replace(/年|月/g, '/').replace('日', ''));
        const dateB = new Date(b.日付.replace(/年|月/g, '/').replace('日', ''));
          return dateB - dateA;  // 降順（新しい順）
      });


      //本文ソースが重複する要素を1つにまとめる。
      const uniqueMap = new Map();
      for (const item of parsData) {
        if (!uniqueMap.has(item.本文ソース)) {
          uniqueMap.set(item.本文ソース, item);
        }
      }
      parsData = Array.from(uniqueMap.values());


      // let  parsData = val
        let selectYearList = [];
        let selectCatList = [];
        // console.log('数は',parsData.length)
        loopNum = parsData.length;
        if (maxNum > 0) loopNum = maxNum;

        for (var i = 0; i < parsData.length; i++) {
          // if(this.csvTrimEnd(parsData[i]['カテゴリー']) === 'Dynabook Directからのお知らせ') return;
          let selectYear = this.csvTrimEnd(parsData[i]['年号']);
          let selectCat = this.csvTagText(this.csvTrimEnd(parsData[i]['カテゴリー']));
          // console.log(selectYear)
          if (!selectYearList.includes(selectYear)) selectYearList.push(selectYear);
          if (!selectCatList.includes(selectCat)) selectCatList.push(selectCat);

          if (this.csvTrimEnd(parsData[i]['カテゴリー']) !== 'Dynabook Directからのお知らせ' && loopCount <= loopNum) {
            listCode += `<li class="p-biztop-2025-info__item">
                      <div class="p-biztop-2025-info__contents">
                        <p class="p-biztop-2025-info__tag c-tag ${this.csvTagColor(selectCat)}">
                          <span>${selectCat}</span>
                        </p>
                        <p class="p-biztop-2025-info__day">${parsData[i]['日付']}</p>
                        <div class="p-biztop-2025-info__text">${parsData[i]['本文ソース']}</div>
                        <span class="c-ico__arrow-c"><span></span></span>
                      </div>
                    </li>`;

            loopCount++;
          }

          // console.log(parsData[i]['年号']);
          if(this.latestYear<Number(parsData[i]['年号'])){
            this.latestYear = Number(parsData[i]['年号']);
          }


        }
        let yearHtml = '<option value="">年号</option>';
        for (var i = 0; i < selectYearList.length; i++) {
          const year = selectYearList[i];
          yearHtml += `<option value="${year}">${year}</option>`;
        }

        

        // let catHtml = '<li><a href="" class="is-active"><span>すべて</span></a></li>';
        // for (var i = 0; i < selectCatList.length; i++) {
        //   const cat = selectCatList[i];
        //   catHtml += `<li><a href="" data-tag="${cat}"><span>${cat}</span></a></li>`;
        // }
        $('.p-dynabook-2025__newsTop__search--year').append(yearHtml);
        // $('.p-dynabook-2025__newsTop__search--tag').append(catHtml);
        $('.p-biztop-2025-info__list').append(listCode);
        const $li = $('.p-biztop-2025-info__list').find('.p-biztop-2025-info__item');
        for (var i = 0; i < $li.length; i++) {
          if ($li.eq(i).find('a').length >= 2) {
            $li.eq(i).find('a').addClass('is-link-color');

          }

        }
        this.onNews();
    }

    csvTagColor(v) {
      let colorTag = 'c-tag__right';
      if (v === '新製品ニュース') colorTag = 'c-tag__red';
      if (v === 'コンテンツ') colorTag = 'c-tag c-tag__dark';

      return colorTag;
    }

    csv2json(item, csvList,) {
      let jsonArray = [];
      let RowArray = csvList;
      let items = item;
      for (let i = 1; i < RowArray.length; i++) {
        let cellArray = RowArray[i];
        let line = new Object();
        for (let j = 0; j < items.length; j++) {
          line[items[j]] = cellArray[j];
        }
        jsonArray.push(line);
      }
      return jsonArray;
    }

    csvTagText(v) {
      let text = v;
      if (text === 'コンテンツ公開更新のお知らせ') text = 'コンテンツ';
      if (text === 'Dynabook Directからのお知らせ') text = 'Dynabook Direct';
      if (text === 'イベントのお知らせ') text = 'イベント';
      if (text === 'dynabook.comからのお知らせ') text = 'お知らせ';
      return text;
    }

    csvTrimEnd(v) {
      let text = v.trimEnd();
      return text;
    }

    onTab(e) {
      e.preventDefault();
      const $btn = $(e.currentTarget);
      const targetId = $btn.attr('data-target');
      // $('.p-top-2025-search__area').removeClass('is-active');
      // $('.p-top-2025-search__btn--u').removeClass('is-active');
      if ($('.p-top-2025-search__btn--ui')[0]) {
        this.onTabChange($btn, $('#' + targetId), ['.p-top-2025-search__area', '.p-top-2025-search__btn--ui']);
      } else {
        this.onTabChange($btn, $(targetId), [$btn.attr('data-tabContents'), $btn.attr('data-lisetList')], true);
      }
    }

    onTab_s(e) {
      e.preventDefault();
      const $btn = $(e.currentTarget);
      const targetId = $btn.attr('data-target');
      this.onTabChange($btn, $('#' + targetId), ['.p-top-2025-edu__tab--btn', '.p-top-2025-edu__contents'], true)
    }

    onTab_l(e) {
      e.preventDefault();
      const $btn = $(e.currentTarget);
      const targetId = $btn.attr('data-target');
      this.onTabChange($btn, $('#' + targetId), ['.p-top-2025-lineup__tab--btn', '.p-top-2025-lineup__wrap'], true)
    }

    onTabChange($btn, $contents, lisetList, noToggle) {
      let isCurrent = false;
      if ($btn.hasClass('is-active')) isCurrent = true;
      if (noToggle && isCurrent) return;
      for (var i = 0; i < lisetList.length; i++) {
        $(lisetList[i]).removeClass('is-active');
      }

      if (!isCurrent) {
        $btn.addClass('is-active')
        $contents.each((i, el) => {
          $(el).addClass('is-active')
        });
      }
    }

    onTelModalOpen() {
      this.$modalTel.show();
      return false;
    }

    onTelModalClose() {
      this.$modalTel.hide();
      return false;
    }

    onScene(e) {
      const $wrap = $('.p-top-2025-scene__wrap');
      const $btn = $(e.currentTarget);
      const data = $btn.attr('data-scene');
      this.$btnScene.removeClass('is-active');
      $btn.addClass('is-active');
      // console.log('data', data)

      if (data === 'all') {
        $wrap.removeClass('is-sort');
      } else {
        $wrap.addClass('is-sort');
      }

      $wrap.attr('id', '').attr('id', 'is-' + data);

      $('.p-top-2025-scene__item .c-productCard__popup').matchHeight();
      $('.p-top-2025-scene__item .c-productCard__col').matchHeight();

    }

    onSlickStart_kv() {
      const $li = $('.p-dynabook-2025__kv--item');
      const $kvThumbnail = $('.p-dynabook-2025__kv--th-btn');
      if ($li.length <= 1) {
        $('.p-dynabook-2025__kv--ui').hide();
        $('.p-dynabook-2025__bnr_win11').addClass('ui-none')
      }
      let htmlDot = ''
      for (var i = 0; i < $li.length; i++) {
        if (i === 0) {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item is-active"></li>';
        } else {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item"></li>';
        }
      }
      $('.p-dynabook-2025__kv .p-dynabook-2025__slider--dot--list').html(htmlDot);
      let timeNum = 3000;
      let isStop = false;
      if (this.$kv.hasClass('is-time')) isStop = true;

      this.$kv.on("init", ((slick) => {
        if (isStop) {
          
          setTimeout(() => {
            this.$kv.slick('slickPause');
            setTimeout(() => {
              this.$kv.slick('slickPlay');
            }, 10000);
          }, 10);

          setTimeout(() => {
            const $videoAll =  $('video');
            for (var i = 0; i < $videoAll.length; i++) {
                const $video = $videoAll.eq(i);
               $video.get(0).play();
            }
          }, 1000);
        };

      }))

      this.$kv.slick(
        {
          arrows: false,
          dots: false,
          accessibility: false,
          // centerMode: true,
          slidesToShow: 1,
          autoplaySpeed: timeNum,
          autoplay: true,
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

      this.$kv.on('afterChange', (event, slick, currentSlide) => {
        if (currentSlide === 0 && isStop) {
          setTimeout(() => {
            this.$kv.slick('slickPause');
            setTimeout(() => {
              this.$kv.slick('slickPlay');
            }, 10000);
          }, 10);
        }

      });

      this.$kv.on('swipe', function (event, slick, direction) {
        // console.log(direction);
        $('.p-dynabook-2025__kv--item').attr({ 'aria-hidden': 'false' })
        // left
      });


      $('.p-dynabook-2025__kv--ui-left').on('click', (e) => {
        this.$kv.slick('slickPrev');
      })

      $('.p-dynabook-2025__kv--ui-right').on('click', (e) => {
        this.$kv.slick('slickNext');
      })

      const $dot = $('.p-dynabook-2025__kv .p-dynabook-2025__slider--dot--item');

      this.$kv.on('afterChange', function (event, slick, currentSlide) {
        $dot.removeClass('is-active')
        $kvThumbnail.removeClass('is-active')
        $dot.eq(currentSlide).addClass('is-active')
        $kvThumbnail.eq(currentSlide).addClass('is-active')
      });

      $kvThumbnail.on('click', (e) => {
        const $btn = $(e.currentTarget);
        this.$kv.slick('slickGoTo', $btn.index(), false);
      })
    }

    onSlickStart_pickup() {
      const $wrap = $('.p-dynabook-2025__pickup');
      const $li = $('.p-dynabook-2025__pickup--item');

      let htmlDot = ''
      for (var i = 0; i < $li.length; i++) {
        if (i === 0) {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item is-active"></li>';
        } else {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item"></li>';
        }
      }
      $wrap.find('.p-dynabook-2025__slider--dot--list').html(htmlDot);

      this.$pickup.slick(
        {
          arrows: false,
          // centerMode: true,
          slidesToShow: 3,
          autoplaySpeed: 3000,
          autoplay: true,
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

      this.$pickup.on('swipe', function (event, slick, direction) {
        $li.attr({ 'aria-hidden': 'false' })
      });


      $wrap.find('.p-dynabook-2025__slider--arrow-left').on('click', (e) => {
        this.$pickup.slick('slickPrev');
      })

      $wrap.find('.p-dynabook-2025__slider--arrow-right').on('click', (e) => {
        this.$pickup.slick('slickNext');
      })

      const $dot = $wrap.find('.p-dynabook-2025__slider--dot--item');

      this.$pickup.on('afterChange', function (event, slick, currentSlide) {
        $dot.removeClass('is-active')
        $dot.eq(currentSlide).addClass('is-active')
      });
      this.$pickup.on('breakpoint', function (event, slick, breakpoint) {
        // console.log('breakpoint:', breakpoint)
        onUIview();
      });
      onUIview();
      function onUIview() {
        if (Model.data.modelMq === 'SP') {
          if ($li.length <= 1) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        } else {
          if ($li.length <= 3) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        }

      }
      // $('.cm-th__li').on('click',(e)=>{
      //   const $btn = $(e.currentTarget);
      //   this.$pickup.slick('slickGoTo', $btn.index(), false);
      // })
    }

    onSlickStart_helpful() {
      const $wrap = $('.p-dynabook-2025__helpful');
      const $li = $('.p-dynabook-2025__helpful--item');
      if ($li.length <= 1) {
        $wrap.find('.p-dynabook-2025__slider--ui').hide();
      }
      let htmlDot = ''
      for (var i = 0; i < $li.length; i++) {
        if (i === 0) {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item is-active"></li>';
        } else {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item"></li>';
        }
      }
      $wrap.find('.p-dynabook-2025__slider--dot--list').html(htmlDot);

      this.$helpful.slick(
        {
          arrows: false,
          // centerMode: true,
          slidesToShow: 4,
          autoplaySpeed: 3000,
          autoplay: true,
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

      this.$helpful.on('swipe', function (event, slick, direction) {
        $li.attr({ 'aria-hidden': 'false' })
      });


      $wrap.find('.p-dynabook-2025__slider--arrow-left').on('click', (e) => {
        this.$helpful.slick('slickPrev');
      })

      $wrap.find('.p-dynabook-2025__slider--arrow-right').on('click', (e) => {
        this.$helpful.slick('slickNext');
      })

      const $dot = $wrap.find('.p-dynabook-2025__slider--dot--item');

      this.$helpful.on('afterChange', function (event, slick, currentSlide) {
        $dot.removeClass('is-active')
        $dot.eq(currentSlide).addClass('is-active')
      });

      this.$helpful.on('breakpoint', function (event, slick, breakpoint) {
        // console.log('breakpoint:', breakpoint)
        onUIview();
      });
      onUIview();
      function onUIview() {
        if (Model.data.modelMq === 'SP') {
          if ($li.length <= 1) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        } else {
          if ($li.length <= 4) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        }

      }

      // $('.cm-th__li').on('click',(e)=>{
      //   const $btn = $(e.currentTarget);
      //   this.$helpful.slick('slickGoTo', $btn.index(), false);
      // })
    }

    onSlickStart_movie() {
      const $wrap = $('.p-dynabook-2025__movie--wrap');
      const $li = $('.p-dynabook-2025__movie--item');
      if ($li.length <= 1) {
        $wrap.find('.p-dynabook-2025__slider--ui').hide();
      }
      let htmlDot = ''
      for (var i = 0; i < $li.length; i++) {
        if (i === 0) {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item is-active"></li>';
        } else {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item"></li>';
        }
      }
      $wrap.find('.p-dynabook-2025__slider--dot--list').html(htmlDot);

      this.$movie.slick(
        {
          arrows: false,
          // centerMode: true,
          slidesToShow: 1,
          autoplaySpeed: 3000,
          autoplay: true,
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

      this.$movie.on('swipe', function (event, slick, direction) {
        $li.attr({ 'aria-hidden': 'false' })
      });


      $wrap.find('.p-dynabook-2025__slider--arrow-left').on('click', (e) => {
        this.$movie.slick('slickPrev');
      })

      $wrap.find('.p-dynabook-2025__slider--arrow-right').on('click', (e) => {
        this.$movie.slick('slickNext');
      })

      const $dot = $wrap.find('.p-dynabook-2025__slider--dot--item');

      this.$movie.on('afterChange', function (event, slick, currentSlide) {
        $dot.removeClass('is-active')
        $dot.eq(currentSlide).addClass('is-active')
      });

      this.$movie.on('breakpoint', function (event, slick, breakpoint) {
        // console.log('breakpoint:', breakpoint)
        onUIview();
      });
      onUIview();
      function onUIview() {
        if (Model.data.modelMq === 'SP') {
          if ($li.length <= 1) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        } else {
          if ($li.length <= 2) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        }

      }



      // $('.cm-th__li').on('click',(e)=>{
      //   const $btn = $(e.currentTarget);
      //   this.$movie.slick('slickGoTo', $btn.index(), false);
      // })
    }


    onSlickStart_3_1($target) {
      const $wrap = $target;
      const $listBox = $target.find('.js-slider-3_1-list');
      const $li = $wrap.find('.js-slider-3_1-item');

      let htmlDot = ''
      for (var i = 0; i < $li.length; i++) {
        if (i === 0) {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item is-active"></li>';
        } else {
          htmlDot += '<li class="p-dynabook-2025__slider--dot--item"></li>';
        }
      }
      $wrap.find('.p-dynabook-2025__slider--dot--list').html(htmlDot);

      $listBox.slick(
        {
          arrows: false,
          // centerMode: true,
          slidesToShow: 3,
          autoplaySpeed: 3000,
          autoplay: true,
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

      $listBox.on('swipe', function (event, slick, direction) {
        $li.attr({ 'aria-hidden': 'false' })
      });


      $wrap.find('.p-dynabook-2025__slider--arrow-left').on('click', (e) => {
        $listBox.slick('slickPrev');
      })

      $wrap.find('.p-dynabook-2025__slider--arrow-right').on('click', (e) => {
        $listBox.slick('slickNext');
      })

      const $dot = $wrap.find('.p-dynabook-2025__slider--dot--item');

      $listBox.on('afterChange', function (event, slick, currentSlide) {
        $dot.removeClass('is-active')
        $dot.eq(currentSlide).addClass('is-active')
      });
      $listBox.on('breakpoint', function (event, slick, breakpoint) {
        // console.log('breakpoint:', breakpoint)
        onUIview();
      });
      onUIview();
      function onUIview() {
        if (Model.data.modelMq === 'SP') {
          if ($li.length <= 1) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        } else {
          if ($li.length <= 3) {
            $wrap.find('.p-dynabook-2025__slider--ui').hide();
          } else {
            $wrap.find('.p-dynabook-2025__slider--ui').show();
          }
        }
      }
    }

    onPageTo(hash) {
      if (($(hash).length === 0) || (hash === "")) return false;
      let headerLevel0H = 0;
      if (Model.data.modelMq !== 'SP') {

        headerLevel0H = $('.p-2025-header__block--level-0').outerHeight();
      }
      // console.log('>>onPageTo',hash)
      // const oft = $(hash).offset().top - $('.p-2025-header').outerHeight() + headerLevel0H;
      const oft = $(hash).offset().top - $('.p-2025-header__block--level-1').outerHeight();
      ;

      $('html, body').animate({ scrollTop: oft }, 500, 'swing');

      if ($(hash).find('.js-accordion-title')[0]) {
        if (!$(hash).find('.js-accordion-title').hasClass('is-active')) {
          $(hash).find('.js-accordion-title').trigger('click');
        }
      }
    };

    onNews() {

      // console.log('--------------news')
      const $wrap = $('.p-dynabook-2025-newsTop .p-dynabook-2025__newsTop__search');
      const $list = $('.p-dynabook-2025-newsTop .p-biztop-2025-info__list');
      const $message = $('.p-dynabook-2025-newsTop .p-biztop-2025-info__message');
      function onSearch() {
        // console.log('-------onSearch')
        $message.removeClass("is-visible");

        let tag = ''
        if ($wrap.find(".p-dynabook-2025__newsTop__search--tag .is-active").length) {
          tag = $wrap.find(".p-dynabook-2025__newsTop__search--tag .is-active").data("tag");

        }
        const $year = $wrap.find(".p-dynabook-2025__newsTop__search--year").val();
        $list.find(".p-biztop-2025-info__item.is-active").removeClass("is-active");
        $list.find(".p-biztop-2025-info__item").each((i, el) => {
          if ($(el).find(".p-biztop-2025-info__day").html().match(new RegExp('^' + $year))) {
            if (tag === '' || $(el).find(".p-biztop-2025-info__tag").html().match(new RegExp(tag))) {
              $(el).addClass("is-active");
            }
          }
        });
        if ($list.find(".p-biztop-2025-info__item.is-active").length <= 0) {
          $message.addClass("is-visible");
        }
      }
      $wrap.find('a').not('.is-direct').on('click', function (e) {
        e.preventDefault();
        $wrap.find(".p-dynabook-2025__newsTop__search--tag .is-active").removeClass('is-active');
        $(this).addClass("is-active");
        onSearch();
        return false;
      });
      $wrap.find('.p-dynabook-2025__newsTop__search--year').on('change', function (e) {
        onSearch();
      });
      console.log('最新年',this.latestYear);
      $wrap.find(".p-dynabook-2025__newsTop__search--year").val(this.latestYear);
      onSearch();
    };

    onBusProduct__gallery() {
      const $gallery = $('.p-dynabook-2025__busProduct__gallery--pc')
        ;

      const $$checkBreakPoint = ($carousel) => {
        const w = $(window).width();
        if (w <= 780) {

          $carousel.not('.slick-initialized').slick({
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '3px',
            arrows: false,
            dots: true,
            customPaging: function (slick, index) {
              const thumb = slick.$slides.eq(index).find('img').attr('src');
              return `<img src="${thumb}"/>`;
            }
          });

        } else {
          $carousel.slick('unslick');
        }
      };

      $(window).resize(function () {
        $gallery.each((i, el) => {

          const $carousel = $(el)
            ;

          $$checkBreakPoint($carousel);

        });
      });

      $gallery.each((i, el) => {

        const $carousel = $(el)
          ;

        $$checkBreakPoint($carousel);

      });
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
