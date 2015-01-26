/*!
* getusermedia-js
* v0.2.0 - 2015-01-25
* https://github.com/addyosmani/getUserMedia.js
* (c) Addy Osmani; MIT License
*//*this is a special version of the library with flash fallback support
stripped out, for anyone that wants it*/
;(function (window, document) {
    "use strict";

    window.getUserMedia = function (options, successCallback, errorCallback, videoElement) {

        // Options are required
        if (options !== undefined) {

            // getUserMedia() feature detection
            navigator.getUserMedia_ = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

            if ( !! navigator.getUserMedia_) {

                // constructing a getUserMedia config-object and 
                // an string (we will try both)
                var option_object = {};
                var option_string = '';
                var container, video, ow, oh;

                if (options.video === true) {
                    option_object.video = true;
                    option_string = 'video';
                }
                if (options.audio === true) {
                    option_object.audio = true;
                    if (option_string !== '') {
                        option_string = option_string + ', ';
                    }
                    option_string = option_string + 'audio';
                }

                if(!videoElement){

                    container = document.getElementById(options.el);
                    videoElement = document.createElement('video');
                    container.appendChild(videoElement);

                }

                // configure the interim video
                videoElement.width = options.width;
                videoElement.height = options.height;
                videoElement.autoplay = true;
                video = videoElement;

                // referenced for use in your applications
                options.videoEl = video;
                options.context = 'webrtc';

                // first we try if getUserMedia supports the config object
                try {
                    // try object
                    navigator.getUserMedia_(option_object, successCallback, errorCallback);
                } catch (e) {
                    // option object fails
                    try {
                        // try string syntax
                        // if the config object failes, we try a config string
                        navigator.getUserMedia_(option_string, successCallback, errorCallback);
                    } catch (e2) {
                        // both failed
                        // neither object nor string works
                        return undefined;
                    }
                }
            } 
        }
    };

}(this, document));