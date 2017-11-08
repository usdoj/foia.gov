var ajaxHost="foia/";
var textbox;
var noAgency=4;
var listAgencyPage=0;
var openSelection;
var lineAgencySelection=1;
var pageAgencySelection=15;

var reportSelection="reportRequests";	//navigation point
var searchCriteria="";	//advance search criteria string
var advanceSearchEnable=false;
var selectionPs=0;
var jumpLocation="";

//#### page initial works
getListAgencyinPage("popupMsgBody",1);
initRequests();
//popupOpenToData();
//var popupFocus=document.getElementById("popupMsg");
//if(popupFocus != null) popupFocus.focus();
//####


function startRequest(param){
var requestString="foia/FoiaGlance.jsp?requestYear=2009&agencyName="+param;

	divAjaxData="foiaData";
	IEAjaxRequest(requestString);
	popupWinClose();
}

function initRequests(){
var requestString="foia/FoiaGlance.jsp?requestYear=2009&agencyName=";

	try{
		//alert(location.search);
		if(location.search != ""){
			if(location.search.charAt(0) == '?'){
				//alert(requestString);
				requestString=requestString+location.search.substr(1);
				//alert(requestString);
			}
			divAjaxData="foiaData";
			IEAjaxRequest(requestString);
		}else{
			popupOpenToData();
		}
	}catch(e){}
}

function popupOpenToData(popupWindow){
  var de = document.documentElement;
  if(popupWindow == null) popupWindow="popupMsg";
  var popup=document.getElementById(popupWindow);
  var exitWin;
  var winSize;
  var allowLines;
  var popupPad;

  winSize=document.documentElement.clientHeight;


  allowLines=parseInt((winSize-70)/40-1);
  allowLines=pageAgencySelection-allowLines;
  if(allowLines<0) allowLines=0;
  popupPad=winSize-(pageAgencySelection*40+90+allowLines*10);
  popupPad=popupPad/2;
  //alert(winSize+"  "+allowLines+" lines: "+pageAgencySelection+" Padding: "+popupPad);

  if(popup != null){
	//e.innerHTML=exitWin;
	popup.style.display='block';
	popup.style.marginTop=(winSize/2*-1+popupPad)+"px";
	popup.focus();
	windowPopup=popupWindow;
  }
  var filter=document.getElementById("shadowFilter");
  if(filter != null){
	filter.style.display='block';
	filter.style.filter = "alpha(opacity=60)";
	filter.onclick=function(){
		popupCloseToData();
	}
  }
  var chart;
  chart=document.getElementById("chartdiv");
  if(chart != null){
	chart.style.display='none';
  }
}

function popupCloseToData(){

  var popup=document.getElementById(windowPopup);
  if(popup != null){
	popup.style.display='none';
  }
  var filter=document.getElementById("shadowFilter");
  if(filter != null){
	filter.style.display='none';
  }
  window.open("reports.html","_self");
}


$('#main span[title]').qtip({ style: { name: 'dark', tip: true } })
$('#main a[title]').qtip({
	content: {
      text: false // Use each elements title attribute
      },
      style: {
      padding: 5,
      background: '#577493',
      color: '#ffffff',
      border: {
         width: 7,
         radius: 5,
         color: '#577493'
      },
      tip: 'topLeft',
      name: 'dark' // Inherit the rest of the attributes from the preset dark style
   }
});

function PageInit(){
$('a.printbuttonhelp').qtip({
	content: '<p>To Print: Please select Landscape in the Page Setup Options</p>',
	hide: {
            fixed: true,
            delay: 240
         },
	style: { width: 250, padding: 5, color: '#ffffff', background: '#577493', border:{width:7, radius: 5, color: '#577493'}, tip: 'bottomLeft'},
	position: {
      corner: {
         target: 'topRight',
         tooltip: 'bottomLeft'
      }
   }
});

$('a.chartHelp').qtip({
	content: '<p>This is a quick glance at the data that is available in each agency&#39;s Annual FOIA Report, and represents some of the most popular statistics and facts within each report. As each fiscal year ends, the snapshot provided here will always represent the most recent year of data as it becomes available on FOIA.Gov.  Remember, this is just a quick glance of an agency&#39;s Annual FOIA Report Data.  For more data and reports, please visit the <a href="data.html" style="color: #ffffff; font-style:italic; font-weight:bold;">Data page</a> on FOIA.Gov.</p>',
	hide: {
            fixed: true,
            delay: 240
         },
	style: { width: 500, padding: 5, color: '#ffffff', background: '#577493', border:{width:7, radius: 5, color: '#577493'}, tip: 'topLeft'},
	position: {
      corner: {
         target: 'bottomRight',
         tooltip: 'topLeft'
      }
   }
});
}
