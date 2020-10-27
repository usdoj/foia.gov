/*
	JavaScripts for Agency List pop-up manipulation
*/

function showAgency(no){
	listAgencyPage=0;
	previousListAgencyBlock();
	textbox=no;
	popupWinOpen();
}

function showReportVideo(report){
var atext='<div style="width:579px;">';
	atext+='<div class="popupClose"><a href="javascript:popupWinClose();">close<img src="images/popup-close.gif" alt="Close Window" /></a></div>';
	atext+='<object id="videoFQT" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="579" height="383" align="left">';

    	atext+='<param name="movie" value="/video/DOJVideoPlayer16to9.swf" />';
    	atext+='<param name="FlashVars" value="flvPath=foia/foia';
    	atext+=report;
    	atext+='.flv&captionUrl=video/';
    	atext+=report;
    	atext+='-cap.xml&previewUrl=images/';
    	atext+=report;
    	atext+='.png" />';
	atext+='<param name="quality" value="high" />';
	atext+='<param name="bgcolor" value="#ffffff" />';
	atext+='<embed id="videoEmbFQT" src="/video/DOJVideoPlayer16to9.swf" ';
	atext+='FlashVars="flvPath=foia/foia';
	atext+=report;
	atext+='.flv&captionUrl=video/';
	atext+=report;
	atext+='-cap.xml&previewUrl=images/';
	atext+=report;
	atext+='.png" ';
	atext+='quality="high" bgcolor="#ffffff" width="579" height="383" align="right"  allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';


	atext+='</object></div>';
	var videoNode=document.getElementById("popupVideo");
	videoNode.innerHTML=atext;

	popupWinOpenGeneric("popupVideo");
}

function setAgency(agency){
	var x=document.getElementById("agency"+textbox);
	var y;
	x.value=agency;
	x.focus();
	if(x.value == agencies[0]){
		for(var i=textbox+1;i<noAgency+1;++i){
		//alert(textbox);
			x=document.getElementById("agencydiv"+i);
			x.style.display="none";
		}
	}else{
		for(var i=textbox+1;i<noAgency+1;++i){
			x=document.getElementById("agencydiv"+i);
			y=document.getElementById("agency"+i);
			if(y.value != "") x.style.display="block";
		}
	}
	popupWinClose();
}

function getListAgencyinPage(winAgency,func){
	var ret="";
	var status="block";
	if(winAgency == null) winAgency="popupMsgBody";
	if(func == null) func=0;
	var x=document.getElementById(winAgency);
	var max=1;
	var linesOnList=24;
  var winSize;
  var allowLines;
  var popupPad;
  var offset;
  var goSmall=false;

  	winSize=document.documentElement.clientHeight;
  	allowLines=(winSize-93)/43-1;
  	if(allowLines>23) pageAgencySelection=24;
  	else if(allowLines>20) pageAgencySelection=20;
  	else if(allowLines>18) pageAgencySelection=18;
  	else if(allowLines>15) pageAgencySelection=15;
  	else if(allowLines>12) pageAgencySelection=12;
		else {
      pageAgencySelection=12;
      goSmall=true;
    }
		//else if(allowLines>12) pageAgencySelection=12;
	     	//else if(allowLines>10) pageAgencySelection=10;
		     //else pageAgencySelection=parseInt(allowLines);

	//ret+="<div style=\"float:right; margin: 30px 0 0 0;\"><a href=\"#\" class=\"selectButton\"><span>Select</span></a></div>";
	//ret+="<h1>SELECT COMPONENTS</h1>";
	ret+="<h2><div style='float:left;'>ALL AGENCIES</div><div style='float:right;padding:6px 18px 0px 0px;'>";
	if(lineAgencySelection != 1){
		ret+="<a href='javascript:previousListAgency(";
		ret+=func;
		ret+=");'>&lt;&lt;Previous</a></div>&nbsp;</h2>";
	}else{
		ret+="<a href='javascript:nextListAgency(";
		ret+=func;
		ret+=");'>Next&gt;&gt;</a></div>&nbsp;</h2>";
	}
	//ret+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;<a href='javascript:previousListAgencyBlock();'>&lt;&lt;Previous</a>&nbsp;|&nbsp;";
	//ret+="<a href='javascript:nextListAgencyBlock();'>Next&gt;&gt;</a>&nbsp;)</h2>";

  //construct agencies list popup window
	max=(agencies.length-1);
	max-=(agencies.length-1)%linesOnList;
	max/=linesOnList;
	linesOnList=pageAgencySelection;
	ret+="<table>"
	//for(var j=0;j<max+1;++j){
		offset=(lineAgencySelection-1)*(max+1);
		for(var i=1;i<(1+pageAgencySelection);++i){
			ret+="<tr>";
			for(var j=0;j<max+1;++j){
				if((j*linesOnList+i+offset)<agencies.length){
					ret+="<td>";
					if(func == 2){
						if(agenciesFile[j*linesOnList+i+offset] != ' '){
							ret+="<a href=\"javascript:startRequest('";
							ret+=agenciesFile[j*linesOnList+i+offset];
							ret+="');\">";
							ret+=agencies[j*linesOnList+i+offset];
							ret+="</a>";
						}else{
							ret+=agencies[j*linesOnList+i+offset];
						}

					}else{
						if(agenciesAb[j*linesOnList+i+offset] != ' '){
							if(func == 1){
								ret+="<a href=\"javascript:startRequest('";
								ret+=agenciesAb[j*linesOnList+i+offset];
							}else{
								ret+="<a href=\"javascript:setAgency('";
								ret+=agencies[j*linesOnList+i+offset];
							}
							ret+="');\">";
							ret+=agencies[j*linesOnList+i+offset];
							ret+="</a>";
						}else{
							ret+=agencies[j*linesOnList+i+offset];
						}
					}
					ret+="</td>";
				}
			}
			ret+="</tr>";
		}
		ret+="</table>";
		status="none";
	//}
	//ret+="<div style=\"margin: 30px 0 0 0;\"><a href=\"#\" class=\"selectButton\"><span>Select</span></a></div>";
	ret+="<div class=\"clear\"></div>";
	ret+="<h2><div style='float:right;padding:3px 18px 0px 0px;'>";
	if(lineAgencySelection != 1){
		ret+="<a href='javascript:previousListAgency(";
		ret+=func;
		ret+=");'>&lt;&lt;Previous</a></div>&nbsp;</h2>";
	}else{
		ret+="<a href='javascript:nextListAgency(";
		ret+=func;
		ret+=");'>Next&gt;&gt;</a></div>&nbsp;</h2>";
	}	listAgencyPage=0;
	//alert(ret);
	x.innerHTML=ret;
	tablecloth();
}

function previousListAgency(func){
	lineAgencySelection=1;
	getListAgencyinPage(null,func);
}

function nextListAgency(func){
	lineAgencySelection=pageAgencySelection+1;
	getListAgencyinPage(null,func);
}

function getListAgency(winAgency){
	var ret="";
	var status="block";
	if(winAgency == null) winAgency="popupMsgBody";
	var x=document.getElementById(winAgency);
	var max=1;

	//ret+="<div style=\"float:right; margin: 30px 0 0 0;\"><a href=\"#\" class=\"selectButton\"><span>Select</span></a></div>";
	//ret+="<h1>SELECT COMPONENTS</h1>";
	ret+="<h2>ALL AGENCIES";
	ret+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;<a href='javascript:previousListAgencyBlock();'>&lt;&lt;Previous</a>&nbsp;|&nbsp;";
	ret+="<a href='javascript:nextListAgencyBlock();'>Next&gt;&gt;</a>&nbsp;)</h2>";
	max=(agencies.length-1);
	max-=(agencies.length-1)%24;
	max/=24;
	for(var j=0;j<max+1;++j){
		ret+="<div id='listAgency"+j+"' style='display:"+status+"';>";
		ret+="<ul>";
		for(var i=j*24+1;i<(j+1)*24+1;++i){
			if(i<agencies.length){
			ret+="<li>";
			ret+="<a href=\"javascript:setAgency('";
			ret+=agencies[i];
			ret+="');\">";
			ret+=agencies[i];
			ret+="</a>";
			ret+="</li>";
			}
		}
		ret+="</ul>";
		ret+="</div>";
		status="none";
	}
	//ret+="<div style=\"margin: 30px 0 0 0;\"><a href=\"#\" class=\"selectButton\"><span>Select</span></a></div>";
	ret+="<div class=\"clear\"></div>";
	listAgencyPage=0;
	//alert(ret);
	x.innerHTML=ret;
}

function nextListAgencyBlock(){
	var ret="";
	var x;
	var max=1;

	max=(agencies.length-1);
	max-=(agencies.length-1)%24;
	max/=24;
	if(listAgencyPage<max){
		++listAgencyPage;
	}
	for(var j=0;j<max+1;++j){
		x=document.getElementById('listAgency'+j);
		if(x != null){
			if(j==listAgencyPage) x.style.display="block";
			else x.style.display="none";
		}
	}
}

function previousListAgencyBlock(){
	var ret="";
	var x;
	var max=1;

	max=(agencies.length-1);
	max-=(agencies.length-1)%24;
	max/=25;

	if(listAgencyPage>0){
		--listAgencyPage;
	}
	for(var j=0;j<max+1;++j){
		x=document.getElementById('listAgency'+j);
		if(x != null){
			if(j==listAgencyPage) x.style.display="block";
			else x.style.display="none";
		}
	}
}