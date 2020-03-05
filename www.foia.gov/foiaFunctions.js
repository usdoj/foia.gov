/*
	JavaScripts for FOIA's Requesting Calls
*/


/*
	Global variables
*/

var curYear=2020;
var aLink=["reportRequests","reportExemptions",
		"reportAppeals","reportProcessingTime","reportFeeWaiver",
		"reportPersonnel","reportBacklog","reportConsultations",
		"requestDisposition","requestDenial","requestPending",
		"Exemption3Statutes",
		"appealDisposition","appealDenialEx","appealDenialOther",
		"appealDenialReason","appealResponseTime","appeal10Pending",
    "processingGranted","processingSimple","processingComplex",
    "processingExpedited","processingPending",
    "processing10Request","personnelCost",
    "consultation10Oldest","requestCompare",
    "requestBacklog",
    "appealCompare","appealBacklog",
    "feewaiverWaiver","reportAdministration",
    "subsection","reportExclusions","reportProactive"];

var jspLink=["foia/Services/DataRequest.jsp?","foia/Services/DataExemption.jsp?",
		"foia/Services/DataAppeal.jsp?","foia/Services/DataProcessTime.jsp?","foia/Services/DataFeewaiver.jsp?",
		"foia/Services/DataPerson.jsp?","foia/Services/DataBacklog.jsp?","foia/Services/DataConsultant.jsp?",
		"foia/Services/RequestDisposition.jsp?","foia/Services/RequestDenial.jsp?","foia/Services/RequestPending.jsp?",
		"foia/Services/Exemption3Statutes.jsp?",
		"foia/Services/appealDisposition.jsp?","foia/Services/appealDenialEx.jsp?","foia/Services/appealDenialOther.jsp?",
		"foia/Services/appealDenialReason.jsp?","foia/Services/appealResponseTime.jsp?","foia/Services/appeal10Pending.jsp?",
		"foia/Services/processingGranted.jsp?","foia/Services/processingSimple.jsp?","foia/Services/processingComplex.jsp?",
		"foia/Services/processingExpedited.jsp?","foia/Services/processingPending.jsp?",
		"foia/Services/processing10Request.jsp?","foia/Services/personnelCost.jsp?",
		"foia/Services/consultation10Oldest.jsp?","foia/Services/requestCompare.jsp?",
		"foia/Services/requestBacklog.jsp?",
		"foia/Services/appealCompare.jsp?","foia/Services/appealBacklog.jsp?",
		"foia/Services/feewaiverWaiver.jsp?","foia/Services/DataPerson.jsp?",
    "foia/Services/postSubsection.jsp?","foia/Services/postSubsection.jsp?","foia/Services/postProactive.jsp?"];

var funcName=[
"reportRequests",
"requestDisposition",
"reportFeeWaiver",
"reportExemptions",
"Exemption3Statutes",
"reportAppeals",
"appealDisposition",
"appealDenialEx",
"appealDenialOther",
"appealDenialReason",
"appealResponseTime",
"appeal10Pending",
"reportProcessingTime",
"processingGranted",
"processingSimple",
"processingComplex",
"processingExpedited",
"processingPending",
"processing10Request",
"feewaiverWaiver",
"reportAdministration",
"reportPersonnel",
"personnelCost",
"reportBacklog",
"reportConsultations",
"consultation10Oldest",
"requestCompare",
"requestBacklog",
"appealCompare",
"appealBacklog",
"reportExclusions",
"reportProactive"
];

var funcPoint=[
1,
9,
"reportFeeWaiver",
2,
0,
3,
13,
14,
15,
0,
17,
18,
4,
19,
20,
21,
22,
23,
24,
31,
5,
5,
25,
6,
7,
0,
27,
28,
29,
30,
31,
32
];

//filters for different report
var fieldRequest=["*********","Request Pending on Start","Request Received in FY","Request Processed in FY","Request Pending for Next","*********","Request Full Grant","Request Partial Grant","Request Full Denial Exemption","No Record","All Records","Request Withdraw","Fee-Relative","Not Reasonable","Improper FOIA","Not Agency Record","Duplicate Request","Other","Total"];
var noFieldRequest=[0,51001,51002,51003,51004,0,52101,52102,52103,52104,52105,52106,52107,52108,52109,52110,52111,52112,52113];
var fieldRequest_Disposition=["Request Full Grant","Request Partial Grant","Request Full Denial Exemption","No Record","All Records","Request Withdraw","Fee-Relative","Not Reasonable","Improper FOIA","Not Agency Record","Duplicate Request","Other","Total"];
var noFieldRequest_Disposition=[52101,52102,52103,52104,52105,52106,52107,52108,52109,52110,52111,52112,52113];
var fieldRequest_Denial=["*********"];
var noFieldRequest_Denial=[0];
var fieldRequest_Penidng=["*********"];
var noFieldRequest_Penidng=[0];
var fieldExemption=["Request Ex. 1","Request Ex. 2","Request Ex. 3","Request Ex. 4","Request Ex. 5","Request Ex. 6","Request Ex. 7A","Request Ex. 7B","Request Ex. 7C","Request Ex. 7D","Request Ex. 7E","Request Ex. 7F","Request Ex. 8","Request Ex. 9"];
var noFieldExemption=[52301,52302,52303,52304,52305,52306,52307,52308,52309,52310,52311,52312,52313,52314];
var fieldAppeal=["Appeal Pending on FY Start","Appeal Received in FY","Appeal Processed in FY","Appeal Left after FY","Affirmed","PartAffirmed","CompleteReversed","OtherReason","Total Appeal Disposition","No Record","All Records","Request Withdraw","Other"];
var noFieldAppeal=[61001,61002,61003,61004,62001,62002,62003,62004,62005,63201,63202,63203,63211];
var fieldAppeal_Disposition=["Affirmed","PartAffirmed","CompleteReversed","OtherReason","Total Appeal Disposition"];
var noFieldAppeal_Disposition=[62001,62002,62003,62004,62005];
var fieldAppeal_DinExemption=["Request Ex. 1","Request Ex. 2","Request Ex. 3","Request Ex. 4","Request Ex. 5","Request Ex. 6","Request Ex. 7A","Request Ex. 7B","Request Ex. 7C","Request Ex. 7D","Request Ex. 7E","Request Ex. 7F","Request Ex. 8","Request Ex. 9"];
var noFieldAppeal_DinExemption=[63101,63102,63103,63104,63105,63106,63107,63108,63109,63110,63111,63112,63113,63114];
var fieldAppeal_DenOther=["No Record","All Records","Request Withdraw","Fee-Relative","Not Reasonable","Improper FOIA","Not Agency Record","Duplicate Request","Request in Litigation","Appeal Based Solely on Denial for Expedited Processing","Other","Total"];
var noFieldAppeal_DenOther=[63201,63202,63203,63204,63205,63206,63207,63208,63209,63210,63211,63212];
var fieldAppeal_DenReason=["*********"];
var noFieldAppeal_DenReason=[0];
var fieldAppeal_ProcessTime=["Median Number of Days","Average Number of Days","Lowest Number of Days","Hieghest Number of Days"];
var noFieldAppeal_ProcessTime=[63401,63402,63403,63404];
var fieldAppeal_10Oldest=["Oldest Request Pending Days","2nd Request Pending","3th Request Pending","4th Request Pending","5th Request Pending","6th Request Pending","7th Request Pending","8th Request Pending","9th Request Pending","10th Request Pending"];
var noFieldAppeal_10Oldest=[63512,63513,63514,63515,63516,63517,63518,63519,63520,63521];
var fieldProcessingTime_normal=["Simple-Median No. of Days","Simple-Average No. of Days","Simple-Lowest No. of Days","Simple-Highest No. of Days","Complex-Median No. of Days","Complex-Average No. of Days","Complex-Lowest No. of Days","Complex-Highest No. of Days","Expedited Processing-Median No. of Days","Expedited Processing-Average No. of Days","Expedited Processing-Lowest No. of Days","Expedited Processing-Highest No. of Days"];
var noFieldProcessingTime_normal=[71001,71002,71003,71004,71005,71006,71007,71008,71009,71010,71011,71012];
var fieldProcessingTime_granted=["Simple-Median No. of Days","Simple-Average No. of Days","Simple-Lowest No. of Days","Simple-Highest No. of Days","Complex-Median No. of Days","Complex-Average No. of Days","Complex-Lowest No. of Days","Complex-Highest No. of Days","Expedited Processing-Median No. of Days","Expedited Processing-Average No. of Days","Expedited Processing-Lowest No. of Days","Expedited Processing-Highest No. of Days"];
var noFieldProcessingTime_granted=[71101,71102,71103,71104,71105,71106,71107,71108,71109,71110,71111,71112];
var fieldProcessingTime_simple=["1-20","21-40","41-60","61-80","81-100","101-120","121-140","141-160","161-180","181-200","201-300","301-400","400+"];
var noFieldProcessingTime_simple=[73001,73002,73003,73004,73005,73006,73007,73008,73009,73010,73011,73012,73013];
var fieldProcessingTime_complex=["1-20","21-40","41-60","61-80","81-100","101-120","121-140","141-160","161-180","181-200","201-300","301-400","400+"];
var noFieldProcessingTime_complex=[73101,73102,73103,73104,73105,73106,73107,73108,73109,73110,73111,73112,73113];
var fieldProcessingTime_expedited=["1-20","21-40","41-60","61-80","81-100","101-120","121-140","141-160","161-180","181-200","201-300","301-400","400+"];
var noFieldProcessingTime_expedited=[73201,73202,73203,73204,73205,73206,73207,73208,73209,73210,73211,73212,73213];
var fieldProcessingTime_pending=["Number Pending","Median No. of Days","Average No. of Days","Number Pending","Median No. of Days","Average No. of Days","Number Pending","Median No. of Days","Average No. of Days"];
var noFieldProcessingTime_pending=[74001,74002,74003,74004,74005,74006,74007,74008,74009];
var fieldProcessingTime_oldest=["Oldest Request Pending Days","2nd Request Pending","3th Request Pending","4th Request Pending","5th Request Pending","6th Request Pending","7th Request Pending","8th Request Pending","9th Request Pending","10th Request Pending"];
var noFieldProcessingTime_oldest=[75011,75012,75013,75014,75015,75016,75017,75018,75019,75020];
var fieldFeeWaiver=["Number Granted","Number Denied","Median Number of Days to Adjudicate","Average Number of Days to Adjudicate","Number Adjudicate within 10 Calendar Days"];
var noFieldFeeWaiver=[81001,81002,81003,81004,81005];
var fieldFeeWaiver_Waiver=["Number Granted","Number Denied","Median Number of Days to Adjudicate","Average Number of Days to Adjudicate"];
var noFieldFeeWaiver_Waiver=[82001,82002,82003,82004];
var fieldPersonnel=["Number of Full Time FOIA Employees","Equivalent Full Time FOIA Employees","Total Number of Full-Time FOIA Staff"];
var noFieldPersonnel=[90001,90002,90003];
var fieldPersonnel_Cost=["Processing Costs","Litigation-Related Costs","Total Costs"];
var noFieldPersonnel_Cost=[90004,90005,90006];
var fieldBacklog=["Number of Backloged Request as of EOFY","Number of Backloged Appeal as of EOFY"];
var noFieldBacklog=[121001,121002];
var fieldConsultation=["Consultations Pending SOFY","Consultations Received DOFY","Consultations Processed DOFY","Consultations Pending EOFY"];
var noFieldConsultation=[122001,122002,122003,122004];
var fieldConsultation_Oldest=["*********"];
var noFieldConsultation_Oldest=[0];
var fieldrequest_Comparison=["*********"];
var noFieldrequest_Comparison=[0];
var fieldrequest_backlog=["*********"];
var noFieldrequest_backlog=[0];
var fieldappeal_comparison=["*********"];
var noFieldappeal_comparison=[0];
var fieldappeal_backlog=["*********"];
var noFieldappeal_backlog=[0];
var fieldSubsection=["*********"];
var noFieldSubsection=[0];
var fieldExclusions=["timeUsed"];
var noFieldExclusions=[110001];
var fieldProactive=["byFOIA","byPO"];
var noFieldProactive=[110002,110003];
var fieldAdministration=["*********"];
var noFieldAdministration=[0];


//point to report filter array
var aFieldCondition=[fieldRequest,fieldExemption,fieldAppeal,
fieldProcessingTime_normal,fieldFeeWaiver,fieldPersonnel,fieldBacklog,fieldConsultation,
fieldRequest_Disposition,fieldRequest_Denial,fieldRequest_Penidng,fieldExemption,
fieldAppeal_Disposition,fieldAppeal_DinExemption,fieldAppeal_DenOther,fieldAppeal_DenReason,fieldAppeal_ProcessTime,
fieldAppeal_10Oldest,
fieldProcessingTime_granted,fieldProcessingTime_simple,fieldProcessingTime_complex,fieldProcessingTime_expedited,
fieldProcessingTime_pending,fieldProcessingTime_oldest,fieldPersonnel_Cost,
fieldConsultation_Oldest,fieldrequest_Comparison,fieldrequest_backlog,fieldappeal_comparison,fieldappeal_backlog,
fieldFeeWaiver_Waiver,fieldAdministration,
fieldSubsection,fieldExclusions,fieldProactive];

var aNoFieldCondition=[noFieldRequest,noFieldExemption,noFieldAppeal,
noFieldProcessingTime_normal,noFieldFeeWaiver,noFieldPersonnel,noFieldBacklog,noFieldConsultation,
noFieldRequest_Disposition,noFieldRequest_Denial,noFieldRequest_Penidng,noFieldExemption,
noFieldAppeal_Disposition,noFieldAppeal_DinExemption,noFieldAppeal_DenOther,noFieldAppeal_DenReason,
noFieldAppeal_ProcessTime,noFieldAppeal_10Oldest,
noFieldProcessingTime_granted,noFieldProcessingTime_simple,noFieldProcessingTime_complex,noFieldProcessingTime_expedited,
noFieldProcessingTime_pending,noFieldProcessingTime_oldest,noFieldPersonnel_Cost,
noFieldConsultation_Oldest,noFieldrequest_Comparison,noFieldrequest_backlog,noFieldappeal_comparison,noFieldappeal_backlog,
noFieldFeeWaiver_Waiver,noFieldAdministration,
noFieldSubsection,noFieldExclusions,noFieldProactive];

var aPSCondition=[fieldProcessingTime_normal,fieldProcessingTime_granted,fieldProcessingTime_simple,fieldProcessingTime_complex,fieldProcessingTime_expedited,fieldProcessingTime_pending,fieldProcessingTime_oldest];
var aNoPSCondition=[noFieldProcessingTime_normal,noFieldProcessingTime_granted,noFieldProcessingTime_simple,noFieldProcessingTime_complex,noFieldProcessingTime_expedited,noFieldProcessingTime_pending,noFieldProcessingTime_oldest];


function startRequest(){
var requestString="foia/FoiaData.jsp?";
var x;
var agencyName="";
var ret="";
var z;

	for(var i=0;i<aLink.length;++i){
		if(reportSelection == aLink[i]){
			requestString=jspLink[i];
			break;
		}
	}
	if(advanceSearchEnable){
		x=document.getElementById("fullReportList");
		if(x != null){
			reportSelection=x.options[x.selectedIndex].value;
			for(var i=0;i<aLink.length;++i){
				if(reportSelection == aLink[i]){
					requestString=jspLink[i];
					break;
				}
			}
		}
	}
	requestString+=getScreenFY();
	ret=getScreenAgency();
	if(ret == "" && !advanceSearchEnable){
		alert("no agency provided.");
	}else{
		requestString+=ret;
		if(consolelog) console.log(requestString);
		if(getCriteria()){
			requestString+=searchCriteria;
			jumpLocation="";
			divAjaxData="foiaData";
			IEAjaxRequest(requestString);
		}
	}
}


function sortRequest(param){
var requestString="foia/FoiaSort.jsp?";
var x;
var agencyName="";

	jumpLocation="foiaReportsTable";
	requestString+=param;
	//alert(requestString);
	divAjaxData="foiaData";
	IEAjaxRequest(requestString);
}

function breadcrumRequest(param){
var requestString="foia/FoiaBreadcrum.jsp?";
var x;
var agencyName="";
var z;
var y;

	requestString+="TargetSession=";
	requestString+=param;
	//alert(requestString);
	jumpLocation="tableContainer";
	divAjaxData="foiaData";
	IEAjaxRequest(requestString);
	if(param == 0){

		x=document.getElementById("searchAdvance");
		x.style.display='none';
		var x=document.getElementById("basicSearch");
		x.style.display='block';
		advanceSearchEnable=false;
		resetReportSelect('reportRequests');

		for(var i=2;i<5;++i){
			z=document.getElementById("addagency"+i);
			if(z != null){
				z.className='addAgency';
			}
			x=document.getElementById("agencydiv"+i);
			if(x != null){
				x.style.display='none';
			}

			y=document.getElementById("agency"+i);
			if(y != null){
				y.value='';
			}
		}

		x=document.getElementById("addagency1");
		if(x != null){
			x.className='addAgency';
		}

		y=document.getElementById("agency1");
		if(y != null){
			y.value='';
		}
		x=document.getElementById("FY2010");
		if(x != null){
			//x.checked=true;
		}
	}
}

function drilldownRequest(param){
var requestString="foia/FoiaForm.jsp?";
var x;
var agencyName="";

	var multiple=param.indexOf("Multiple&");
	if(multiple>-1){
		requestString="foia/FoiaDrilldown.jsp?";
		param=param.substring(multiple+9);
	}
	requestString+=param;
	//alert(requestString);
	divAjaxData="foiaData";
	IEAjaxRequest(requestString);
}

function compareRequest(param){
var requestString="foia/FoiaCompare.jsp?";
var x;
var agencyName="";

	requestString+=param;
	//alert(requestString);
	divAjaxData="foiaData";
	IEAjaxRequest(requestString);
}

function drilldownRequests(param){
var requestString="foia/FoiaDrilldown.jsp?";
var x;
var agencyName="";

	requestString+=param;
	//alert(requestString);
	divAjaxData="foiaData";
	IEAjaxRequest(requestString);
}


function setPSsearchField(){
	var x;
	var fields;
	var nofields;
	var options;
	var ctlLength;

		x=document.getElementById("psReport");
		if(x != null) selectionPs=x.options[x.selectedIndex].value;
		fields=aPSCondition[selectionPs];
		nofields=aNoPSCondition[selectionPs];

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
}

//parsing advance search components
function getCriteria(){
	var queryString="";
	var ret="";
	searchCriteria="";
	var x=document.getElementById("requestField");
	queryString+=x.options[x.selectedIndex].value;
	x=document.getElementById("comparator");
	queryString+=x.options[x.selectedIndex].value;
	x=document.getElementById("compValue");
	queryString+=x.value;
	if(!advanceSearchEnable){
		return true;
	}
	var patt1=/^\d\d+\.(gt|lt|eq)\.\-?\d+$/g;
	if(!patt1.test(queryString)){
		alert("Please provide correct query string.");
		return false;
	}
	searchCriteria+="&advanceSearch="+queryString;
	return true;
}


function resetReportSelect(reportName){
	var x;
	var c;

	c=document.getElementById(reportName);
	try{
		c=c.nextSibling.nextSibling;
		if(c != null){
			if(c.nodeName == "DIV"){
				c.style.display='block';
				if(openSelection != null){
					if(c != openSelection){
						openSelection.style.display='none';
					}
				}
				openSelection=c;
			}
		}
	}catch(ex){
	}

	//for(var i=0;i<aLink.length;++i){
		x=document.getElementById(reportSelection);
		if(x != null){
			//x.style.color="";
			//x.style.backgroundImage="";
			x.className="";
		}
		try{
			if(reportSelection == "reportAdministration"){
				x=document.getElementById("reportPersonnel");
				x.className="";
			}
			if(reportSelection == "reportPersonnel"){
				x=document.getElementById("reportAdministration");
				x.className="";
			}
			//if(reportSelection == "subsection"){
			//	x=document.getElementById("exclusions");
			//	x.className="";
			//}
			//if(reportSelection == "exclusions"){
			//	x=document.getElementById("subsection");
			//	x.className="";
			//}
		}catch(ex){
		}
	//}

	setReportSelect(reportName);
	if(consolelog) console.log(reportSelection);
	//for(var i=0;i<aLink.length;++i){
	//	if(reportSelection == aLink[i]){
	//		setSearchFields(i);
	//		break;
	//	}
	//}
}

function setReportSelect(reportName){
	var x=document.getElementById(reportName);

	if(x != null){
		//x.style.color="#fff";
		//x.style.background="url(images/report-list-bg.jpg) top left repeat-x";
		try{
			x.className="reportSelected";
			if(reportName == "reportAdministration"){
				x=document.getElementById("reportPersonnel");
				x.className="reportSelected";
			}
			if(reportName == "reportPersonnel"){
				x=document.getElementById("reportAdministration");
				x.className="reportSelected";
			}
			//if(reportName == "exclusions"){
			//	x=document.getElementById("subsection");
			//	x.className="reportSelected";
			//}
			//if(reportName == "subsection"){
			//	x=document.getElementById("exclusions");
			//	x.className="reportSelected";
			//}
			reportSelection=reportName;
      if(consolelog) console.log(reportName);
		}catch(ex){
		}
	}
}

function changeReportSelect(){
var x;
var selection=aLink[0];

	x=document.getElementById("fullReportList");
	if(x != null) selection=x.options[x.selectedIndex].value;

	for(var i=0;i<aLink.length;++i){
		if(selection == aLink[i]){
			setSearchFields(i);
			try{
				x=document.getElementById("aAttrNo");
				if(x.checked){
					x=document.getElementById("requestField");
					if(i==0){
						x.selectedIndex=2;
						x=document.getElementById("compValue");
						x.value="-999999";
					}
					else{
						x.selectedIndex=1;
						x=document.getElementById("compValue");
						x.value="-999999";
					}
					x=document.getElementById("comparator");
					x.selectedIndex=0;
				}else{
					x=document.getElementById("requestField");
					x.selectedIndex=0;
					x=document.getElementById("compValue");
					x.value="";
				}
			}catch(e){
				selection=aLink[0];
			}
			break;
		}
	}
}

function changeAttrSelect(action){
var x;
var y;
var selection;

	x=document.getElementById("selectionAttributes");
	if(x != null){
		if(action == 0){
			x.style.display='none';
		}else{
			x.style.display='block';
		}
		try{
			x=document.getElementById("aAttrNo");
			if(x.checked){
				x=document.getElementById("requestField");
				y=document.getElementById("fullReportList");
				if(y != null) selection=y.options[y.selectedIndex].value;
				if(selection==aLink[0]){
					x.selectedIndex=2;
					x=document.getElementById("compValue");
					x.value="-999999";
				}
				else{
					x.selectedIndex=1;
					x=document.getElementById("compValue");
					x.value="-999999";
				}
				x=document.getElementById("comparator");
				x.selectedIndex=0;
			}else{
				x=document.getElementById("requestField");
				x.selectedIndex=0;
				x=document.getElementById("compValue");
				x.value="";
			}
		}catch(e){
			selection=aLink[0];
		}
	}
}

function toggleAdvanceSearch(){
	var x=document.getElementById("searchAdvance");
	x.style.display=(!advanceSearchEnable)?'block':'none';
	var x=document.getElementById("basicSearch");
	x.style.display=(!advanceSearchEnable)?'none':'block';
	advanceSearchEnable=!advanceSearchEnable;
}

function openPop(popWindow){
var selectedItem=1;

	if(popWindow.indexOf("filing")>0){
	var x=document.getElementById("ComponentsList");
		selectedItem=(popWindow.indexOf("PrintAll")>0)?9999:x.selectedIndex;
		if(selectedItem == 0) alert("Please select an office to print.");
		else
		if(x != null){
		  popWindow+="&Format="+selectedItem;
		}
	}
	if(selectedItem>0) window.open(popWindow,"_blank");
}

function toggleFYAllButton(){
	if(advanceSearchEnable){
		prefix="a";
	}else{
		prefix="";
	}
	x=document.getElementById(prefix+"ALL");
	if(x != null){
		for(var i=2008;i<curYear;++i){
			y=document.getElementById(prefix+"FY"+i);
			if(y != null){
				if(x.checked){
					y.checked=false;
					y.disabled=true;
				}
				else{
					y.disabled=false;
					if(i == (curYear-1)) y.checked=true;
				}
			}
		}
	}
}
