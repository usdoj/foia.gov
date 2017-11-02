var jumpLocation="";
var xmlHttp;
var w3c=(document.getElementById)?true:false;
var ie=(document.all)?true:false;
var N=-1;
var isWorked=0;
var divAjaxData="foiaData";
var lineAgencySelection=1;
var pageAgencySelection=15;

initRequests();
//Video 1b
$('a.video1b').qtip({
    content: '<div id="vid1b">To view the FOIA.gov videos, you must enable Javascript and install the Adobe Flash player.</div>',
         position: {
            corner: {
               tooltip: 'topRight', // ...and position it center of the screen
               target: 'bottomLeft' // ...and position it center of the screen
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
               var params = { FlashVars: 'flvPath=foia/foia1b.flv&captionUrl=video/1b-cap.xml&previewUrl=images/1b.png' };
               var attrs = { id: 'vid1b' };

               // Embed the youtube video using SWFObject script
               swfobject.embedSWF('video/DOJVideoPlayer16to9.swf', 'vid1b', '640', '398', '10', '#333333', '', params ,attrs);
            },

            onHide: function(){
               // Pause the vide when hidden
               var playerAPI = this.elements.content.find('vid1b').get(0);
               if(playerAPI && playerAPI.pauseVideo) playerAPI.pauseVideo();
            }
         }
      }
      ).attr('href', '#vid');


function initRequests(){
var requestString="";

	try{
		//alert(location.search);
		if(location.search != ""){
			requestString=location.search;
			if(location.search.charAt(0) == '?'){
				//alert(requestString);
				requestString=location.search.substr(1);
				//alert(requestString);
				startRequest(requestString);
			}
		}else{
			getListAgencyinPage("popupMsgBody",2);
		}
	}catch(e){}
}

function refreshLoadPage(){

$('a.foiaHelp').qtip({
	content: '<p><strong>Chief FOIA Officer</strong> &ndash; A designated high-level official within each agency who has overall responsibility for the agency&rsquo;s compliance with the FOIA.</p><p>&nbsp;</p><p><strong>Requester Service Center</strong> &ndash; This is the name and phone number of a contact at each agency or office, where you can call and ask questions about your pending FOIA request. Much like with the FOIA Contact, each agency or office handles only the requests that have been sent to them, and can only answer questions on pending requests within their office.</p><p>&nbsp;</p><p><strong>FOIA Public Liaison</strong> &ndash; If you have any issues with how an agency or office is handling your request, you can call the number found here to talk with that agency or office&rsquo;s FOIA Public Liaison, who will work to address your concerns.</p><p>&nbsp;</p><p><strong>FOIA Contact </strong> &ndash; The name, address and phone number at each agency or office where you can make a FOIA request.  Each agency or office only handles their own records, so make sure you direct a request to the agency or office that would have the records you are interested in.</p><p>&nbsp;</p><p><a href="faq.html#where" style="color:#fff;">Where do I send a FOIA request?</a></p><p>&nbsp;</p><p><a href="faq.html#handle" style="color:#fff;">Who handles FOIA requests?</a></p>',
	hide: {
            fixed: true,
            delay: 240
         },
	style: { width: 600, padding: 5, color: '#ffffff', background: '#577493', border:{width:7, radius: 5, color: '#577493'}, tip: 'rightMiddle'},
	position: {
      corner: {
         target: 'leftMiddle',
         tooltip: 'rightMiddle'
      }
   }
});
}

function startRequest(param){
var requestString="foia/FoiaMakeRequest?agency="+param;

	divAjaxData="subRight";
	IEAjaxRequest(requestString);
	popupWinClose();
}

var FOIA_PROXY = '';

function startFoiaRequest(foiaDataURL){
    if (!/^https:/.test(foiaDataURL)) {
        foiaDataURL = FOIA_PROXY + foiaDataURL;
        console.log("new URL:", foiaDataURL);
    }

	if(window.ActiveXObject){
		try {
  			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
 		}catch(e){
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else if(window.XMLHttpRequest){
		xmlHttp=new XMLHttpRequest();
	}
	//xmlHttp.status=0;
	xmlHttp.open("GET",foiaDataURL,true);
	xmlHttp.setRequestHeader( "Content-type", "text/xml" );
	xmlHttp.onreadystatechange=showFoiaData;
	xmlHttp.send(null);
}



function showFoiaData(){

	if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var s=xmlHttp.responseText;
			var area=document.getElementById(divAjaxData);
			area.innerHTML=s;
			//Initial();
			refreshLoadPage();

		}
		else{
			alert("ready="+xmlHttp.status);

		}
	}
	else{
		//alert("status="+xmlHttp.readystate);
	}
}

function IEAjaxRequest(url){

	url+="&Random=";
	url+=Math.floor(Math.random()*200);
	//alert(url);
	startFoiaRequest(url);
}

function ShowComponents(){
var x=document.getElementById("ComponentsList");

	if(x != null){
	  for(var i=0;i<x.length;++i){
		  chart=document.getElementById(i);
		  if(chart != null){
			chart.style.display='none';
		  }
	  }
	  chart=document.getElementById(x.selectedIndex);
	  if(chart != null){
		chart.style.display='block';
	  }
		//alert(x.size+"  "+x.selectedIndex+"   "+x.length);
	}
}
