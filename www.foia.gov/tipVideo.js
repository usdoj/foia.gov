// JavaScript Document - qTip Video Archives
$('#main a[title]').qtip({ style: { name: 'dark', tip: true } })
//Video 1a
$('a.video1a').qtip({
    content: '<div id="vid1a">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid1a' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/1a.swf', 'vid1a', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid1a').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 1b
$('a.video1b').qtip({
    content: '<div id="vid1b">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid1b' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/1b.swf', 'vid1b', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid1b').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 2
$('a.video2').qtip({
    content: '<div id="vid2">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid2' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/2.swf', 'vid2', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid2').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 3
$('a.video3').qtip({
    content: '<div id="vid3">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid3' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/3.swf', 'vid3', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid3').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 4
$('a.video4').qtip({
    content: '<div id="vid4">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid4' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/4.swf', 'vid4', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid4').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 5
$('a.video5').qtip({
    content: '<div id="vid5">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid5' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/5.swf', 'vid5', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid5').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 6
$('a.video6').qtip({
    content: '<div id="vid6">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid6' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/6.swf', 'vid6', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid6').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 7
$('a.video7').qtip({
    content: '<div id="vid7">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid7' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/7.swf', 'vid7', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid7').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 8
$('a.video8').qtip({
    content: '<div id="vid8">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid8' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/8.swf', 'vid8', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid8').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 9
$('a.video9').qtip({
    content: '<div id="vid9">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid9' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/9.swf', 'vid9', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid9').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 10
$('a.video10').qtip({
    content: '<div id="vid10">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid10' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/10.swf', 'vid10', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid10').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 11
$('a.video11').qtip({
    content: '<div id="vid11">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid11' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/11.swf', 'vid11', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid11').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 12
$('a.video12').qtip({
    content: '<div id="vid12">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid12' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/12.swf', 'vid12', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid12').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 13
$('a.video13').qtip({
    content: '<div id="vid13">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid13' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/13.swf', 'vid13', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid13').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 14
$('a.video14').qtip({
    content: '<div id="vid14">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid14' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/14.swf', 'vid14', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid14').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 15
$('a.video15').qtip({
    content: '<div id="vid15">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid15' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/15.swf', 'vid15', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid15').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
//Video 16
$('a.video16').qtip({
    content: '<div id="vid16">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'bottomMiddle', // ...and position it center of the screen
               target: 'topMiddle' // ...and position it center of the screen
            }
         },
         show: {
            when: 'click', // Show it on click...
            solo: true // ...and hide all others when its shown
         },
         hide: 'unfocus', // Hide it when inactive...
         style: {
            width: 640,
            height: 398,
            padding: 0,
            tip: true,
            name: 'dark'
         },
         api: {
            onRender: function()
            {
               // Setup video paramters
               var params = { allowScriptAccess: 'always', allowfullScreen: 'false' };
               var attrs = { id: 'vid16' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/16.swf', 'vid16', '640', '398', '8', '#333333', params, attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid16').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#');
