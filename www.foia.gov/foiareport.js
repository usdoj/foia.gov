/*
	Global JavaScripts for FOIA
*/


/*
	Global variables
*/

var agencies=new Array();
var agenciesAb=new Array();
var agenciesFile=new Array();


agencies[0]='All Agencies';
agencies[1]='Department of Agriculture';
agencies[2]='Department of Commerce';
agencies[3]='Department of Defense';
agencies[4]='Department of Education';
agencies[5]='Department of Energy';
agencies[6]='Department of Health and Human Services';
agencies[7]='Department of Homeland Security';
agencies[8]='Department of Housing and Urban Development';
agencies[9]='Department of the Interior';
agencies[10]='Department of Justice';
agencies[11]='Department of Labor';
agencies[12]='Department of State';
agencies[13]='Department of Transportation';
agencies[14]='Department of the Treasury';
agencies[15]='Department of Veterans Affairs';


agencies[16]='Administrative Conference of the United States';
agencies[17]='Advisory Council on Historic Preservation';
agencies[18]='U.S. Agency for International Development';
agencies[19]='American Battle Monuments Commission';
agencies[20]='National Railroad Passenger Corporation (Amtrak)';
agencies[21]='Armed Forces Retirement Home';
agencies[22]='U.S. Agency for Global Media';
agencies[23]='Appraisal Subcommittee';
agencies[24]='Central Intelligence Agency';
agencies[25]='Chemical Safety and Hazard Investigation Board';
agencies[26]='U.S. Commission on Civil Rights';
agencies[27]='Commission on Fine Arts';
agencies[28]='Committee for Purchase from People Who Are Blind or ...';
agencies[29]='Commodity Futures Trading Commission';
agencies[30]='Consumer Financial Protection Bureau';
agencies[31]='U.S. Consumer Product Safety Commission';
agencies[32]='Corporation for National and Community Service';
agencies[33]='Council of Inspectors General on Integrity and Efficiency';
agencies[34]='Court Services and Offender Supervision Agency';
agencies[35]='Defense Nuclear Facilities Safety Board';
agencies[36]='Denali Commission';
agencies[37]='Environmental Protection Agency';
agencies[38]='Equal Employment Opportunity Commission';
agencies[39]='Council on Environmental Quality';
agencies[40]='Office of Management and Budget';
agencies[41]='Office of National Drug Control Policy';
agencies[42]='Office of Science and Technology Policy';
agencies[43]='Office of the United States Trade Representative';
agencies[44]='Export-Import Bank of the U.S.';
agencies[45]='Farm Credit Administration';
agencies[46]='Farm Credit System Insurance Corporation';
agencies[47]='Federal Communications Commission';
agencies[48]='Federal Deposit Insurance Corporation';
agencies[49]='Federal Election Commission';
agencies[50]='Federal Energy Regulatory Commission';
agencies[51]='Federal Financial Institutions Council';
agencies[52]='Federal Housing Finance Agency';
agencies[53]='Federal Labor Relations Authority';
agencies[54]='Federal Maritime Commission';
agencies[55]='Federal Mediation And Conciliation Service';
agencies[56]='Federal Mine Safety and Health Review Commission';
agencies[57]='Federal Open Market Committee';
agencies[58]='Board of Governors of the Federal Reserve System';
agencies[59]='Federal Retirement Thrift Investment Board';
agencies[60]='Federal Trade Commission';
agencies[61]='Gulf Coast Ecosystem Restoration Council';
agencies[62]='U.S. General Services Administration';
agencies[63]='Harry S. Truman Scholarship Foundation';
agencies[64]='Institute of Museum and Library Services';
agencies[65]='Inter-American Foundation';
agencies[66]='James Madison Memorial Fellowship Foundation';
agencies[67]='Legal Services Corporation';
agencies[68]='Marine Mammal Commission';
agencies[69]='Merit Systems Protection Board';
agencies[70]='Millennium Challenge Corporation';
agencies[71]='Morris K. Udall Foundation';
agencies[72]='National Aeronautics and Space Administration';
agencies[73]='National Archives and Records Administration';
agencies[74]='National Capital Planning Commission';
agencies[75]='National Commission on Military, National, and Public Service';
agencies[76]='National Council on Disability ';
agencies[77]='National Credit Union Administration';
agencies[78]='National Endowment for the Arts';
agencies[79]='National Endowment for the Humanities';
agencies[80]='National Indian Gaming Commission';
agencies[81]='National Labor Relations Board';
agencies[82]='National Mediation Board';
agencies[83]='National Science Foundation';
agencies[84]='National Transportation Safety Board';
agencies[85]='Neighborhood Reinvestment Corporation';
agencies[86]='U.S. Nuclear Regulatory Commission';
agencies[87]='U.S. Nuclear Waste Technical Review Board';
agencies[88]='Occupational Safety and Health Review Commission';
agencies[89]='Office of Government Ethics';
agencies[90]='Office of Navajo and Hopi Indian Relocation';
agencies[91]='Office of Personnel Management';
agencies[92]='Office of Special Counsel';
agencies[93]='Office of the Director of National Intelligence';
agencies[94]='Overseas Private Investment Corporation';
agencies[95]='Peace Corps';
agencies[96]='Pension Benefit Guaranty Corporation';
agencies[97]='Postal Regulatory Commission';
agencies[98]='Presidio Trust';
agencies[99]='Privacy and Civil Liberties Oversight Board';
agencies[100]='Recovery Accountability and Transparency Board';
agencies[101]='Railroad Retirement Board';
agencies[102]='U.S. Securities and Exchange Commission';
agencies[103]='Selective Service System';
agencies[104]='U.S. Small Business Administration';
agencies[105]='Social Security Administration';
agencies[106]='Social Security Advisory Board';
agencies[107]='Special Inspector General for Afghanistan Reconstruction';
agencies[108]='Special Inspector General for Iraq Reconstruction';
agencies[109]='Surface Transportation Board';
agencies[110]='Tennessee Valley Authority';
agencies[111]='U.S. Access Board';
agencies[112]='U.S. African Development Foundation';
agencies[113]='U.S. Copyright Office';
agencies[114]='U.S. Election Assistance Commission';
agencies[115]='U.S. Institute of Peace';
agencies[116]='U.S. Interagency Council on Homelessness';
agencies[117]='U.S. International Boundary and Water Commission';
agencies[118]='U.S. International Trade Commission';
agencies[119]='U.S. Postal Service';
agencies[120]='United States Trade and Development Agency';





//agencies[95]='Office of Federal Housing Enterprise Oversight';




agenciesAb[0]='ALL';
agenciesAb[1]='USDA';
agenciesAb[2]='DOC';
agenciesAb[3]='DoD';
agenciesAb[4]='ED';
agenciesAb[5]='DOE';
agenciesAb[6]='HHS';
agenciesAb[7]='DHS';
agenciesAb[8]='HUD';
agenciesAb[9]='DOI';
agenciesAb[10]='DOJ';
agenciesAb[11]='U.S. DOL';
agenciesAb[12]='State';
agenciesAb[13]='DOT';
agenciesAb[14]='Treasury';
agenciesAb[15]='VA';

//Federal agencies[]='';
agenciesAb[16]='ACUS';
agenciesAb[17]='ACHP';
agenciesAb[18]='USAID';
agenciesAb[19]='ABMC';
agenciesAb[20]='NRPC';
agenciesAb[21]='AFRH';
agenciesAb[22]='USAGM';
agenciesAb[23]='ASC';
agenciesAb[24]='CIA';
agenciesAb[25]='CSB';
agenciesAb[26]='USCCR';
agenciesAb[27]='CFA';
agenciesAb[28]='CPPBSD';
agenciesAb[29]='CFTC';
agenciesAb[30]='CFPB';
agenciesAb[31]='U.S. CPSC';
agenciesAb[32]='CNCS';
agenciesAb[33]='CIGIE';
agenciesAb[34]='CSOSA';
agenciesAb[35]='DNFSB';
agenciesAb[36]='DC';
agenciesAb[37]='EPA';
agenciesAb[38]='EEOC';
agenciesAb[39]='CEQ';
agenciesAb[40]='OMB';
agenciesAb[41]='ONDCP';
agenciesAb[42]='OSTP';
agenciesAb[43]='USTR';
agenciesAb[44]='Ex-Im Bank';
agenciesAb[45]='FCA';
agenciesAb[46]='FCSIC';
agenciesAb[47]='FCC';
agenciesAb[48]='FDIC';
agenciesAb[49]='FEC';
agenciesAb[50]='FERC';
agenciesAb[51]='FFIEC';
agenciesAb[52]='FHFA';
agenciesAb[53]='FLRA';
agenciesAb[54]='FMC';
agenciesAb[55]='FMCS';
agenciesAb[56]='FMSHRC';
agenciesAb[57]='FOMC';
agenciesAb[58]='FRB';
agenciesAb[59]='FRTIB';
agenciesAb[60]='FTC';
agenciesAb[61]='GCERC';
agenciesAb[62]='GSA';
agenciesAb[63]='HSTSF';
agenciesAb[64]='IMLS';
agenciesAb[65]='IAF';
agenciesAb[66]='JMMFF';
agenciesAb[67]='LSC';
agenciesAb[68]='MMC';
agenciesAb[69]='MSPB';
agenciesAb[70]='MCC';
agenciesAb[71]='MKUF';
agenciesAb[72]='NASA';
agenciesAb[73]='NARA';
agenciesAb[74]='NCPC';
agenciesAb[75]='NCMNPS';
agenciesAb[76]='NCD';
agenciesAb[77]='NCUA';
agenciesAb[78]='NEA';
agenciesAb[79]='NEH';
agenciesAb[80]='NIGC';
agenciesAb[81]='NLRB';
agenciesAb[82]='NMB';
agenciesAb[83]='NSF';
agenciesAb[84]='NTSB';
agenciesAb[85]='NW';
agenciesAb[86]='USNRC';
agenciesAb[87]='NWTRB';
agenciesAb[88]='OSHRC';
agenciesAb[89]='OGE';
agenciesAb[90]='ONHIR';
agenciesAb[91]='OPM';
agenciesAb[92]='OSC';
agenciesAb[93]='ODNI';
agenciesAb[94]='OPIC';
agenciesAb[95]='PC';
agenciesAb[96]='PBGC';
agenciesAb[97]='PRC';
agenciesAb[98]='PT';
agenciesAb[99]='PCLOB';
agenciesAb[100]='RATB';
agenciesAb[101]='US RRB';
agenciesAb[102]='SEC';
agenciesAb[103]='SSS';
agenciesAb[104]='SBA';
agenciesAb[105]='SSA';
agenciesAb[106]='SSAB';
agenciesAb[107]='SIGAR';
agenciesAb[108]='SIGIR';
agenciesAb[109]='STB';
agenciesAb[110]='TVA';
agenciesAb[111]='USAB';
agenciesAb[112]='US ADF';
agenciesAb[113]='CO';
agenciesAb[114]='EAC';
agenciesAb[115]='USIP';
agenciesAb[116]='USICH';
agenciesAb[117]='USIBWC';
agenciesAb[118]='USITC';
agenciesAb[119]='USPS';
agenciesAb[120]='USTDA';





//agenciesAb[95]='OFHEO';


//Where to file of agencies[]='';

agenciesFile[0]='ALL';
agenciesFile[1]='USDA';
agenciesFile[2]='DOC';
agenciesFile[3]='DoD';
agenciesFile[4]='ED';
agenciesFile[5]='DOE';
agenciesFile[6]='HHS';
agenciesFile[7]='DHS';
agenciesFile[8]='HUD';
agenciesFile[9]='DOI';
agenciesFile[10]='DOJ';
agenciesFile[11]='U.S. DOL';
agenciesFile[12]='State';
agenciesFile[13]='DOT';
agenciesFile[14]='Treasury';
agenciesFile[15]='VA';

//Federal agencies[;]='';
agenciesFile[16]='ACUS';

agenciesFile[18]='USAID';
agenciesFile[19]='ABMC';
agenciesFile[20]='NRPC';
agenciesFile[21]='AFRH';
agenciesFile[22]='USAGM';
agenciesFile[23]='ASC';
agenciesFile[24]='CIA';
agenciesFile[25]='CSB';
agenciesFile[26]='USCCR';
agenciesFile[27]='CFA';
agenciesFile[28]='CPPBSD';
agenciesFile[29]='CFTC';
agenciesFile[30]='CFPB';
agenciesFile[31]='U.S. CPSC';
agenciesFile[32]='CNCS';
agenciesFile[33]='CIGIE';
agenciesFile[34]='CSOSA';
agenciesFile[35]='DNFSB';
agenciesFile[36]='DC';
agenciesFile[37]='EPA';
agenciesFile[38]='EEOC';
agenciesFile[39]='CEQ';
agenciesFile[40]='OMB';
agenciesFile[41]='ONDCP';
agenciesFile[42]='OSTP';
agenciesFile[43]='USTR';
agenciesFile[44]='Ex-Im Bank';
agenciesFile[45]='FCA';
agenciesFile[46]='FCSIC';
agenciesFile[47]='FCC';
agenciesFile[48]='FDIC';
agenciesFile[49]='FEC';
agenciesFile[50]='FERC';
agenciesFile[51]='FFIEC';
agenciesFile[52]='FHFA';
agenciesFile[53]='FLRA';
agenciesFile[54]='FMC';
agenciesFile[55]='FMCS';
agenciesFile[56]='FMSHRC';
agenciesFile[57]='FOMC';
agenciesFile[58]='FRB';
agenciesFile[59]='FRTIB';
agenciesFile[60]='FTC';
agenciesFile[61]='GCERC';
agenciesFile[62]='GSA';
agenciesFile[63]='HSTSF';
agenciesFile[64]='IMLS';
agenciesFile[65]='IAF';
agenciesFile[66]='JMMFF';
agenciesFile[67]='LSC';
agenciesFile[68]='MMC';
agenciesFile[69]='MSPB';
agenciesFile[70]='MCC';
agenciesFile[71]='MKUF';
agenciesFile[72]='NASA';
agenciesFile[73]='NARA';
agenciesFile[74]='NCPC';

agenciesFile[76]='NCD';
agenciesFile[77]='NCUA';
agenciesFile[78]='NEA';
agenciesFile[79]='NEH';
agenciesFile[80]='NIGC';
agenciesFile[81]='NLRB';
agenciesFile[82]='NMB';
agenciesFile[83]='NSF';
agenciesFile[84]='NTSB';
agenciesFile[85]='NW';
agenciesFile[86]='USNRC';
agenciesFile[87]=' ';
agenciesFile[88]='OSHRC';
agenciesFile[89]='OGE';
agenciesFile[90]='ONHIR';
agenciesFile[91]='OPM';
agenciesFile[92]='OSC';
agenciesFile[93]='ODNI';
agenciesFile[94]='OPIC';
agenciesFile[95]='PC';
agenciesFile[96]='PBGC';
agenciesFile[97]='PRC';
agenciesFile[98]='PT';
agenciesFile[99]='PCLOB';
agenciesFile[100]='RATB';
agenciesFile[101]='US RRB';
agenciesFile[102]='SEC';
agenciesFile[103]='SSS';
agenciesFile[104]='SBA';
agenciesFile[105]='SSA';
agenciesFile[106]='SSAB';
agenciesFile[107]='SIGAR';
agenciesFile[108]='SIGIR';
agenciesFile[109]='STB';
agenciesFile[110]='TVA';
agenciesFile[111]='USAB';
agenciesFile[112]='US ADF';
agenciesFile[113]='CO';
agenciesFile[114]='EAC';
agenciesFile[115]='USIP';
agenciesFile[116]='USICH';
agenciesFile[117]='USIBWC';
agenciesFile[118]='USITC';
agenciesFile[119]='USPS';
agenciesFile[120]='USTDA';

//agenciesFile[94]='OFHEO';


var windowPopup="popupMsg";

function popupWinClose(){

  var popup=document.getElementById(windowPopup);
  if(popup != null){
	if(windowPopup == 'popupVideo'){
		popup.innerHTML="";
	}
	popup.style.display='none';
  }
  var filter=document.getElementById("shadowFilter");
  if(filter != null){
	filter.style.display='none';
  }
  var chart;
  for(var i=0;i<5;++i){
	  chart=document.getElementById("chartdiv"+i);
	  if(chart != null){
		chart.style.display='block';
	  }else{
	  	break;
	  }
  }
  chart=document.getElementById("chartdiv");
  if(chart != null){
	chart.style.display='block';
  }
}

function popupWinOpenGeneric(popupWindow){
  var de = document.documentElement;
  if(popupWindow == null) popupWindow="popupMsg";
  var popup=document.getElementById(popupWindow);
  var exitWin;
  var winSize;
  var allowLines;
  var popupPad;

  winSize=document.documentElement.clientHeight;



  if(popup != null){
	popup.style.display='block';
	popup.style.marginTop=(popup.clientHeight/2)*-1+"px";
	popup.style.marginLeft=(popup.clientWidth/2)*-1+"px";
	//alert(popup.clientWidth+" height: "+popup.clientHeight);
	windowPopup=popupWindow;
	popup.focus();
  }
  var filter=document.getElementById("shadowFilter");
  if(filter != null){
	filter.style.display='block';
	filter.style.filter = "alpha(opacity=60)";
	filter.onclick=function(){
		popupWinClose();
	}
  }
  //alert(document.body.clientHeight+" height: "+document.documentElement.clientHeight+" width: "+document.documentElement.clientWidth );
  var chart;
  for(var i=0;i<5;++i){
	  chart=document.getElementById("chartdiv"+i);
	  if(chart != null){
		chart.style.display='none';
	  }else{
	  	break;
	  }
  }
  chart=document.getElementById("chartdiv");
  if(chart != null){
	chart.style.display='none';
  }
}

function popupWinOpen(popupWindow){
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
  popupPad=winSize-(pageAgencySelection*40+160+allowLines*20);
  popupPad=popupPad/2;
  if(consolelog) console.log("windows Height="+winSize+"  "+allowLines+" lines: "+pageAgencySelection+" Padding: "+popupPad);

  if(popup != null){
	//e.innerHTML=exitWin;
	popup.style.display='block';
	popup.style.marginTop=(winSize/2*-1+popupPad)+"px";
	windowPopup=popupWindow;
	popup.focus();
  }
  var filter=document.getElementById("shadowFilter");
  if(filter != null){
	filter.style.display='block';
	filter.style.filter = "alpha(opacity=60)";
	filter.onclick=function(){
		popupWinClose();
	}
  }
  //alert(document.body.clientHeight+" height: "+document.documentElement.clientHeight+" width: "+document.documentElement.clientWidth );
  var chart;
  for(var i=0;i<5;++i){
	  chart=document.getElementById("chartdiv"+i);
	  if(chart != null){
		chart.style.display='none';
	  }else{
	  	break;
	  }
  }
  chart=document.getElementById("chartdiv");
  if(chart != null){
	chart.style.display='none';
  }
}

function getScreenFY(){
var fiscalYear="";
var prefix="";


	if(advanceSearchEnable){
		prefix="a";
	}else{
		prefix="";
	}
	for(var i=2008;i<curYear;++i){
		x=document.getElementById(prefix+"FY"+i);
		if(x != null){
			if(x.checked){
				if(fiscalYear != "") fiscalYear+="&";
				fiscalYear+="requestYear[]="+i;
				//break;
			}
		}
	}
	x=document.getElementById(prefix+"ALL");
	if(x != null){
		if(x.checked){
      for(var i=2008;i<curYear;++i){
            fiscalYear+="requestYear[]="+i+"&";
      }
			//fiscalYear="requestYear=2008&requestYear=2009&requestYear=2010&requestYear=2011&requestYear=2012&requestYear=2013&requestYear=2014";
      //fiscalYear+="&requestYear=2015"
		}
	}
	return(fiscalYear);
}

function getScreenAgency(){
var strAgencies="";
var agencyName="";

	if(advanceSearchEnable){
		x=document.getElementById("agencyList");
		if(x != null){
			if(x.selectedIndex>1){
			strAgencies+="&";
			strAgencies+="agencyName[]=";
			strAgencies+=x.options[x.selectedIndex].value;
			}

		}
	}else{
		for(var i=1;i<noAgency+1;++i){
			x=document.getElementById("agency"+i);
			if(x.value == agencies[0]){
				strAgencies="";
				break;
			}
			if(x.value != ""){
				for(var j=0;j<agencies.length;++j){
					if(x.value.toLowerCase() == agencies[j].toLowerCase()){
						agencyName=agenciesAb[j];
						break;
					}
				}
				//if(i != 1) strAgencies+="&";
				strAgencies+="&";
				strAgencies+="agencyName[]=";
				strAgencies+=agencyName;

			}
		}
		//if(advanceSearchEnable){
		//	prefix="a";
		//}else{
		//	prefix="";
		//}
	}

	return(strAgencies);
}

function jmpURL(){

  document.location=exitUrl;
}

function showPageSize(){
  var de = document.documentElement;
  alert("innerwidth="+window.innerWidth+"Selfinnerwidth="+self.innerWidth+"clientwidth="+(de&&de.clientWidth)+"bodywidth="+document.body.clientWidth);
  alert("innerwidth="+window.innerHeight+"innerwidth="+self.innerHeight+"innerwidth="+(de&&de.clientHeight)+"innerwidth="+document.body.clientHeight);
}


function getCheckedComponents(range){
var mapFoiaReport=[
    0,1,4,5,12,28,21,22,30,2,3,
    15,0,6,7,8,9,10,11,13,14,
    14,14,15,16,32,23,24,25,26,27,
    18,37];
var mapFoiaPs=[12,13,14,14,14,15,16];

	var x=document.getElementById("checkedComponents");
	//var ret="compare.html?";
	var ret="";
	if(range == null) range=1;
  if(compareSelected != 0) range = compareSelected;
	//ret+="requestYear=";
	//ret+=getScreenFY();
	ret+="compareRange=";
	//if(range == 4){
		//ret+=mapFoiaPs[selectionPs];
		//ret+="&calculateMethod=";
		//ret+=selectionPs-1;
	//}
	//else{
		ret+=mapFoiaReport[range];
		if(range>19 && range<23){
			ret+="&calculateMethod=";
			ret+=(range-19);
		}
	//}

	//compose yearCompId String
	for(var i=0;i<x.length;i++){
	  if(x.elements[i].type == "checkbox"){
	  	if(x.elements[i].checked){
        ret+="&fyCompId[]=";
        ret+=x.elements[i].name;
	  	}
	  }
	}
	//alert(ret);
	//window.open(ret,"FoiaCompare");	//open another window to browse
	compareRequest(ret);

}

function showDiv(division){
	var x=document.getElementById(division);
	if(x != null){
		x.style.display='block';
	}

}

function hideDiv(division){
	var x=document.getElementById(division);
	if(x != null){
		x.style.display='none';
	}

}

function addAgencyBox(division){

  var x;
  var y;
  var z;
  /*for(var i=1;i<division+2;++i){
  	x=document.getElementById("agencydiv"+i);
  	if(x != null){
		if(x.style.display=='none'){
			x.style.display='block';
  			//y=document.getElementById("createReport");
  			//if(y != null){
  			//	y.setAttribute("class","createReport1");
  			//}
			break;
		}
  	}else{
  		alert("no more agency could be selected.");
  	}
  }*/

  z=document.getElementById("addagency"+division);
  if(z != null){
  	if(z.className == "addAgency"){
  		z.className='deleteAgency';
		x=document.getElementById("agencydiv"+(division+1));
		if(x != null){
			x.style.display='block';
		}
  	}else{
  		z.className='addAgency';
		x=document.getElementById("agencydiv"+(division+1));
		if(x != null){
			x.style.display='none';
		}
		y=document.getElementById("agency"+(division+1));
		if(y != null){
			y.value='';
		}
  	}
  }
}
