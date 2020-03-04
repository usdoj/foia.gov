var ajaxHost="foia/";
var textbox;
var noAgency=4;
var listAgencyPage=0;
var openSelection;
var lineAgencySelection=1;
var pageAgencySelection=15;
var dynaText="For Information on the terms used, consult the FOIA Glossary";

var reportSelection="reportRequests";	//navigation point
var searchCriteria="";	//advance search criteria string
var advanceSearchEnable=false;
var selectionPs=0;
var jumpLocation="";
var compareSelected=0;
var consolelog=true;

//#### page initial works
getListAgencyinPage();
setReportSelect(reportSelection);
//setSearchFields(0);
changeReportSelect();
setAgencyList();
initRequests();

//event triggered
$("#selectReport li a").click(
function(){
var clickedItem = $(this).attr("id");
  if(consolelog) console.log("item clicked: "+clickedItem);
  compareSelected = 0;
  var i = 0;
  for(i=0;i<funcName.length;++i){
    if(clickedItem == funcName[i]){
      compareSelected = funcPoint[i];
      break;
    }
  }
  if(i == 30 || i == 31){
    $("#before2016").css("display","none");
		for(var i=2008;i<2016;++i){
			cBox="#FY"+i;
      $(cBox).attr("checked",false);
      $(cBox).attr("disabled",false);
		}
	if($("#ALL").attr("checked")){
		$("#FY2016").attr("checked",true);
		$("#FY2017").attr("checked",true);
		$("#FY2018").attr("checked",true);
		$("#FY2019").attr("checked",true);
		$("#FY2016").attr("disabled",false);
		$("#FY2017").attr("disabled",false);
		$("#FY2018").attr("disabled",false);
		$("#FY2019").attr("disabled",false);
	}
    $("#ALL").attr("checked",false);
  }else{
    $("#before2016").css("display","block");
    $("#FY2016").attr("disabled",false);
    $("#FY2017").attr("disabled",false);
    $("#FY2018").attr("disabled",false);
    $("#FY2019").attr("disabled",false);
  }
  if(consolelog) console.log("report compare function: "+compareSelected);
}
)
//####

$("#fullReportList").change(
function(){
var clickedItem = $(this).val();
  if(consolelog) console.log("item picked: "+clickedItem);
  compareSelected = 0;
  var i = 0;
  for(i=0;i<funcName.length;++i){
    if(clickedItem == funcName[i]){
      compareSelected = funcPoint[i];
      break;
    }
  }
  if(i == 30 || i == 31){
    $("#aBefore2016").css("display","none");
		for(var i=2008;i<2016;++i){
			cBox="#aFY"+i;
      $(cBox).attr("checked",false);
      $(cBox).attr("disabled",false);
		}
	if($("#aALL").attr("checked")){
		$("#aFY2016").attr("checked",true);
		$("#aFY2017").attr("checked",true);
		$("#aFY2018").attr("checked",true);
		$("#aFY2019").attr("checked",true);
		$("#aFY2016").attr("disabled",false);
		$("#aFY2017").attr("disabled",false);
		$("#aFY2018").attr("disabled",false);
		$("#aFY2019").attr("disabled",false);
	}
    $("#aALL").attr("checked",false);
  }else{
    $("#aBefore2016").css("display","block");
    $("#aFY2016").attr("disabled",false);
    $("#aFY2017").attr("disabled",false);
    $("#aFY2018").attr("disabled",false);
    $("#aFY2019").attr("disabled",false);
  }
  if(consolelog) console.log("report compare function: "+compareSelected);
}
)
//####

$('a.advTips').qtip({
	content: false,
	hide: {
            fixed: true,
            delay: 240
         },
	style: { width: 400, padding: 5, color: '#ffffff', background: '#577493', border:{width:7, radius: 5, color: '#577493'}, tip: 'topMiddle'},
	position: {
      corner: {
         target: 'bottomMiddle',
         tooltip: 'topMiddle'
      }
   }
});

$('a.foiaBasicSearchText').qtip({
	content: 'To create a Basic Report on FOIA.gov, you will need to follow some simple steps.<br /><br />First, select your Report type in the Select Report column. You can do this by clicking on any one of the available categories, such as Requests or Administration.<br /><br /> Next, you will select the agency you want your report on. Type the Agency name in the text field, or use the Show List of Agencies link below the text area to bring up a full list of agencies. You can also add more agencies to your search with the Plus or Minus button to the right of the text area.<br /><br />Lastly, pick the Fiscal Year(s) for your report, and hit the Generate Report button. Your FOIA.gov custom report will generate in the area below the search tools.',
	hide: {
            fixed: true,
            delay: 240
         },
	style: { width: 500, padding: 5, color: '#ffffff', background: '#577493', border:{width:7, radius: 5, color: '#577493'}, tip: 'topMiddle'},
	position: {
      corner: {
         target: 'bottomMiddle',
         tooltip: 'topMiddle'
      }
   }
});
$('a.swBasicSearch').qtip({
	content: 'Click here to toggle the Advanced Search features of FOIA.gov.<br /><br />On the Advanced Search page, you will be able to move step-by-step through the FOIA.gov Data.',
	hide: {
            fixed: true,
            delay: 240
         },
	style: { width: 300, padding: 5, color: '#ffffff', background: '#577493', border:{width:7, radius: 5, color: '#577493'}, tip: 'topMiddle'},
	position: {
      corner: {
         target: 'bottomMiddle',
         tooltip: 'topMiddle'
      }
   }
});

function initRequests(){
var requestString="foia/FoiaInit.jsp?test";

	try{
		//alert(location.search);
		if(location.search != ""){
			requestString=location.search;
			//alert("1"+location.search.charAt(0)+"2"+location.search.charAt(1)+"3"+location.search.charAt(2));
			if(location.search.charAt(0) == '?'){
				//alert(requestString);
				requestString=location.search.substr(1);
				//alert(requestString);
			}
			divAjaxData="foiaData";
			IEAjaxRequest(requestString);
		}else{
			divAjaxData="foiaData";
			IEAjaxRequest(requestString);
		}
	}catch(e){}
}


//construct agency for dropdown list
function setAgencyList(){
	var x;
	var options;


	x=document.getElementById("agencyList");
	//alert(agencies.length);
	for(var i=0;i<agencies.length;++i){		//include "All Agencies" option
		if(agenciesAb[i].length >1){
			options=document.createElement('option');
			options.value=agenciesAb[i];
			options.text=agencies[i];
			try{
				x.add(options,null);
			}catch(ex){
				x.add(options);
			}
		}
	}
}

//construct different searching filters for report selected
function setSearchFields(no){
	var x;
	var fields=aFieldCondition[no];
	var nofields=aNoFieldCondition[no];
	var options;
	var ctlLength;

	//if(no == 3){	//for Preccessing Time dropdown list
	//	x=document.getElementById("selectPsTime");
	//	if(x != null) x.style.display='block';
	//}else{
		x=document.getElementById("selectPsTime");
		if(x != null) x.style.display='none';
	//}

	x=document.getElementById("requestField");
	ctlLength=x.length;
	for(var i=1;i<ctlLength;++i){
		if(x.length == 1) break;
		x.remove(1);
	}

	for(var i=0;i<fields.length;++i){
		options=document.createElement('option');
		options.value=nofields[i];
		if(nofields[i] == 0){
			options.text=(fields[i]);
			options.disabled="disabled";
		}else{
			options.text=("  "+fields[i]);
		}

		try{
			x.add(options,null);
		}catch(ex){
			x.add(options);
		}
	}
	//x=document.getElementById("comparator");
}

function PageInit(){
	var x=document.getElementById("foiaText");

	if(x != null) dynaText=x.innerHTML;

$('a.foiaHelpText').qtip({
	content: dynaText,
	hide: {
            fixed: true,
            delay: 240
         },
	style: { width: 500, padding: 5, color: '#ffffff', background: '#577493', border:{width:7, radius: 5, color: '#577493'}, tip: 'bottomRight'},
	position: {
      corner: {
         target: 'topLeft',
         tooltip: 'bottomRight'
      }
   }
});

}

function toggleDiv(section){
	if($("#agencyInfo"+section).css("display")=="none"){
		$("#agencyInfo"+section).show(800);
	}else{
		$("#agencyInfo"+section).slideUp(800);
	}
}
