/*
モーダル
 */
'use strict';
import Model from '../../global/Model';
export class ModalYoutube {
  constructor() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.player = null;
    this.$html = $('html');
    this.$body = $('body');
    this.classIsModal = 'is-modal';
    this.classIsBodyBar = 'is-bodyBar';
    this.$btnModal = $('.btn-modal');
    this.$Modal = $('.modal');
    this.$btnModal.on('click', this.onModal.bind(this));
    this.$Modal.on('click', this.onModalClose.bind(this));
    $('.modal-youtube-bg').on('click', this.onModalClose.bind(this));
    this.youtubeId = '';
    window.onYouTubeIframeAPIReady = () => {
      console.log('============OK')
    }
  }

  onModal(e) {
    // if (Model.data.modelMq === 'SP') {
    //    this.youtubeId = $(e.currentTarget).attr('data-movie');
    //    console.log(this.youtubeId)
    //    window.open(`https://youtu.be/${this.youtubeId}`);
    //   return false;
    // }
    if (this.$html.hasClass(this.classIsModal)) {
      this.onModalClose();
    } else {
      this.youtubeId = $(e.currentTarget).attr('data-movie');
      this.$html.addClass(this.classIsModal)
      if (this.$body.height() > $(window).height()) this.$body.addClass(this.classIsBodyBar);
      
      this.player = new YT.Player('movie-player', {
        // videoId: $('.move-yt').attr('video-id'), // 埋め込む動画のID
        // videoId: 'mHPR8pdHuLE', // 埋め込む動画のID
        videoId: this.youtubeId, // 埋め込む動画のID
        playerVars: {
          // 'autoplay': 1,
        },
        events: {
          'onReady': (event) => {
          },
          'onStateChange': (event) => {
            var ytStatus = event.data;
            if (ytStatus == YT.PlayerState.ENDED) {
              // $('.movie').removeClass('is-movie');
              console.log('--終了')
              this.player.seekTo(0);
              this.player.stopVideo();
            }
          }

        }
      });
    }
    return false;
  }

  onModalClose() {
    this.$html.removeClass(this.classIsModal)
    this.$body.removeClass(this.classIsBodyBar);
    $('.modal-movie').empty();
    $('.modal-movie').html('<div id="movie-player"></div>');
    console.log('close')
  }

}
export default ModalYoutube;
