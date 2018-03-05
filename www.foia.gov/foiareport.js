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
agencies[17]='U.S. Agency for International Development';
agencies[18]='American Battle Monuments Commission';
agencies[19]='National Railroad Passenger Corporation (Amtrak)';
agencies[20]='Armed Forces Retirement Home';
agencies[21]='Appraisal Subcommittee';
agencies[22]='Broadcasting Board of Governors';
agencies[23]='Central Intelligence Agency';
agencies[24]='Chemical Safety and Hazard Investigation Board';
agencies[25]='U.S. Commission on Civil Rights';
agencies[26]='Commission on Fine Arts';
agencies[27]='Committee for Purchase from People Who Are Blind or &#8230';
agencies[28]='Commodity Futures Trading Commission';
agencies[29]='Consumer Financial Protection Bureau';
agencies[30]='U.S. Consumer Product Safety Commission';
agencies[31]='Corporation for National and Community Service';
agencies[32]='Council of Inspectors General on Integrity and Efficiency';
agencies[33]='Court Services and Offender Supervision Agency';
agencies[34]='Defense Nuclear Facilities Safety Board';
agencies[35]='Denali Commission';
agencies[36]='Environmental Protection Agency';
agencies[37]='Equal Employment Opportunity Commission';
agencies[38]='Council on Environmental Quality';
agencies[39]='Office of Management and Budget';
agencies[40]='Office of National Drug Control Policy';
agencies[41]='Office of Science and Technology Policy';
agencies[42]='Office of the United States Trade Representative';
agencies[43]='Export-Import Bank of the U.S.';
agencies[44]='Farm Credit Administration';
agencies[45]='Farm Credit System Insurance Corporation';
agencies[46]='Federal Communications Commission';
agencies[47]='Federal Deposit Insurance Corporation';
agencies[48]='Federal Election Commission';
agencies[49]='Federal Energy Regulatory Commission';
agencies[50]='Federal Financial Institutions Council';
agencies[51]='Federal Housing Finance Agency';
agencies[52]='Federal Labor Relations Authority';
agencies[53]='Federal Maritime Commission';
agencies[54]='Federal Mediation And Conciliation Service';
agencies[55]='Federal Mine Safety and Health Review Commission';
agencies[56]='Federal Open Market Committee';
agencies[57]='Board of Governors of the Federal Reserve System';
agencies[58]='Federal Retirement Thrift Investment Board';
agencies[59]='Federal Trade Commission';
agencies[60]='Gulf Coast Ecosystem Restoration Council';
agencies[61]='U.S. General Services Administration';
agencies[62]='Harry S. Truman Scholarship Foundation';
agencies[63]='Institute of Museum and Library Services';
agencies[64]='Inter-American Foundation';
agencies[65]='James Madison Memorial Fellowship Foundation';
agencies[66]='Legal Services Corporation';
agencies[67]='Marine Mammal Commission';
agencies[68]='Merit Systems Protection Board';
agencies[69]='Millennium Challenge Corporation';
agencies[70]='Morris K. Udall Foundation';
agencies[71]='National Aeronautics and Space Administration';
agencies[72]='National Archives and Records Administration';
agencies[73]='National Capital Planning Commission';
agencies[74]='National Credit Union Administration';
agencies[75]='National Council on Disability ';
agencies[76]='National Endowment for the Arts';
agencies[77]='National Endowment for the Humanities';
agencies[78]='National Indian Gaming Commision';
agencies[79]='National Labor Relations Board';
agencies[80]='National Mediation Board';
agencies[81]='National Science Foundation';
agencies[82]='National Transportation Safety Board';
agencies[83]='Neighborhood Reinvestment Corporation';
agencies[84]='U.S. Nuclear Regulatory Commission';
agencies[85]='U.S. Nuclear Waste Technical Review Board';
agencies[86]='Occupational Safety and Health Review Commission';
agencies[87]='Office of Government Ethics';
agencies[88]='Office of Navajo and Hopi Indian Relocation';
agencies[89]='Office of Personnel Management';
agencies[90]='Office of Special Counsel';
agencies[91]='Office of the Director of National Intelligence';
agencies[92]='Overseas Private Investment Corporation';
agencies[93]='Peace Corps';
agencies[94]='Pension Benefit Guaranty Corporation';
agencies[95]='Postal Regulatory Commission';
agencies[96]='Presidio Trust';
agencies[97]='Privacy and Civil Liberties Oversight Board';
agencies[98]='Recovery Accountability and Transparency Board';
agencies[99]='Railroad Retirement Board';
agencies[100]='U.S. Securities and Exchange Commission';
agencies[101]='Selective Service System';
agencies[102]='U.S. Small Business Administration';
agencies[103]='Social Security Administration';
agencies[104]='Social Security Advisory Board';
agencies[105]='Special Inspector General for Afghanistan Reconstruction';
agencies[106]='Special Inspector General for Iraq Reconstruction';
agencies[107]='Surface Transportation Board';
agencies[108]='Tennessee Valley Authority';
agencies[109]='U.S. Access Board';
agencies[110]='U.S. African Development Foundation';
agencies[111]='U.S. Copyright Office';
agencies[112]='U.S. Election Assistance Commission';
agencies[113]='U.S. Institute of Peace';
agencies[114]='U.S. Interagency Council on Homelessness';
agencies[115]='U.S. International Boundary and Water Commission';
agencies[116]='U.S. International Trade Commission';
agencies[117]='U.S. Postal Service';
agencies[118]='United States Trade and Development Agency';





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

//Federal agencies
agenciesAb[16]='ACUS';
agenciesAb[17]='USAID';
agenciesAb[18]='ABMC';
agenciesAb[19]='NRPC';
agenciesAb[20]='AFRH';
agenciesAb[21]='ASC';
agenciesAb[22]='BBG';
agenciesAb[23]='CIA';
agenciesAb[24]='CSB';
agenciesAb[25]='USCCR';
agenciesAb[26]='CFA';
agenciesAb[27]='CPPBSD';
agenciesAb[28]='CFTC';
agenciesAb[29]='CFPB';
agenciesAb[30]='U.S. CPSC';
agenciesAb[31]='CNCS';
agenciesAb[32]='CIGIE';
agenciesAb[33]='CSOSA';
agenciesAb[34]='DNFSB';
agenciesAb[35]='DC';
agenciesAb[36]='EPA';
agenciesAb[37]='EEOC';
agenciesAb[38]='CEQ';
agenciesAb[39]='OMB';
agenciesAb[40]='ONDCP';
agenciesAb[41]='OSTP';
agenciesAb[42]='USTR';
agenciesAb[43]='Ex-Im Bank';
agenciesAb[44]='FCA';
agenciesAb[45]='FCSIC';
agenciesAb[46]='FCC';
agenciesAb[47]='FDIC';
agenciesAb[48]='FEC';
agenciesAb[49]='FERC';
agenciesAb[50]='FFIEC';
agenciesAb[51]='FHFA';
agenciesAb[52]='FLRA';
agenciesAb[53]='FMC';
agenciesAb[54]='FMCS';
agenciesAb[55]='FMSHRC';
agenciesAb[56]='FOMC';
agenciesAb[57]='FRB';
agenciesAb[58]='FRTIB';
agenciesAb[59]='FTC';
agenciesAb[60]='GCERC';
agenciesAb[61]='GSA';
agenciesAb[62]='HSTSF';
agenciesAb[63]='IMLS';
agenciesAb[64]='IAF';
agenciesAb[65]='JMMFF';
agenciesAb[66]='LSC';
agenciesAb[67]='MMC';
agenciesAb[68]='MSPB';
agenciesAb[69]='MCC';
agenciesAb[70]='MKUF';
agenciesAb[71]='NASA';
agenciesAb[72]='NARA';
agenciesAb[73]='NCPC';
agenciesAb[74]='NCUA';
agenciesAb[75]='NCD';
agenciesAb[76]='NEA';
agenciesAb[77]='NEH';
agenciesAb[78]='NIGC';
agenciesAb[79]='NLRB';
agenciesAb[80]='NMB';
agenciesAb[81]='NSF';
agenciesAb[82]='NTSB';
agenciesAb[83]='NW';
agenciesAb[84]='USNRC';
agenciesAb[85]='NWTRB';
agenciesAb[86]='OSHRC';
agenciesAb[87]='OGE';
agenciesAb[88]='ONHIR';
agenciesAb[89]='OPM';
agenciesAb[90]='OSC';
agenciesAb[91]='ODNI';
agenciesAb[92]='OPIC';
agenciesAb[93]='PC';
agenciesAb[94]='PBGC';
agenciesAb[95]='PRC';
agenciesAb[96]='PT';
agenciesAb[97]='PCLOB';
agenciesAb[98]='RATB';
agenciesAb[99]='US RRB';
agenciesAb[100]='SEC';
agenciesAb[101]='SSS';
agenciesAb[102]='SBA';
agenciesAb[103]='SSA';
agenciesAb[104]='SSAB';
agenciesAb[105]='SIGAR';
agenciesAb[106]='SIGIR';
agenciesAb[107]='STB';
agenciesAb[108]='TVA';
agenciesAb[109]='USAB';
agenciesAb[110]='US ADF';
agenciesAb[111]='CO';
agenciesAb[112]='EAC';
agenciesAb[113]='USIP';
agenciesAb[114]='USICH';
agenciesAb[115]='USIBWC';
agenciesAb[116]='USITC';
agenciesAb[117]='USPS';
agenciesAb[118]='USTDA';






//agenciesAb[95]='OFHEO';


//Where to file of agencies[';

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

//Federal agencies';
agenciesFile[16]='ACUS';
agenciesFile[17]='USAID';
agenciesFile[18]='ABMC';
agenciesFile[19]='NRPC';
agenciesFile[20]='AFRH';
agenciesFile[21]='ASC'; //'ASC'
agenciesFile[22]='BBG';
agenciesFile[23]='CIA';
agenciesFile[24]='CSB';
agenciesFile[25]='USCCR';
agenciesFile[26]='CFA'; //'CFA'
agenciesFile[27]='CPPBSD';
agenciesFile[28]='CFTC';
agenciesFile[29]='CFPB';
agenciesFile[30]='U.S. CPSC';
agenciesFile[31]='CNCS';
agenciesFile[32]='CIGIE';
agenciesFile[33]='CSOSA';
agenciesFile[34]='DNFSB';
agenciesFile[35]='DC'; 'DC'
agenciesFile[36]='EPA';
agenciesFile[37]='EEOC';
agenciesFile[38]='CEQ';
agenciesFile[39]='OMB';
agenciesFile[40]='ONDCP';
agenciesFile[41]='OSTP';
agenciesFile[42]='USTR';
agenciesFile[43]='Ex-Im Bank';
agenciesFile[44]='FCA';
agenciesFile[45]='FCSIC';
agenciesFile[46]='FCC';
agenciesFile[47]='FDIC';
agenciesFile[48]='FEC';
agenciesFile[49]='FERC';
agenciesFile[50]='FFIEC';
agenciesFile[51]='FHFA';
agenciesFile[52]='FLRA';
agenciesFile[53]='FMC';
agenciesFile[54]='FMCS';
agenciesFile[55]='FMSHRC';
agenciesFile[56]='FOMC';
agenciesFile[57]='FRB';
agenciesFile[58]='FRTIB';
agenciesFile[59]='FTC';
agenciesFile[60]='GCERC'; //'GCERC'
agenciesFile[61]='GSA';
agenciesFile[62]='HSTSF';  //'HSTSF';
agenciesFile[63]='IMLS';
agenciesFile[64]='IAF';
agenciesFile[65]='JMMFF';     //'JMMFF';
agenciesFile[66]='LSC';
agenciesFile[67]='MMC';   //'MMC';
agenciesFile[68]='MSPB';
agenciesFile[69]='MCC';
agenciesFile[70]='MKUF';   //'MKUF';
agenciesFile[71]='NASA';
agenciesFile[72]='NARA';
agenciesFile[73]='NCPC';
agenciesFile[74]='NCUA';
agenciesFile[75]='NCD';   //'NCD';
agenciesFile[76]='NEA';
agenciesFile[77]='NEH';
agenciesFile[78]='NIGC';
agenciesFile[79]='NLRB';
agenciesFile[80]='NMB';
agenciesFile[81]='NSF';
agenciesFile[82]='NTSB';
agenciesFile[83]='NW';   //'NW';
agenciesFile[84]='USNRC';
agenciesFile[85]='NWTRB';
agenciesFile[86]='OSHRC';
agenciesFile[87]='OGE';
agenciesFile[88]='ONHIR';
agenciesFile[89]='OPM';
agenciesFile[90]='OSC';
agenciesFile[91]='ODNI';
agenciesFile[92]='OPIC';
agenciesFile[93]='PC';
agenciesFile[94]='PBGC';
agenciesFile[95]='PRC';
agenciesFile[96]='PT';
agenciesFile[97]='PCLOB';
agenciesFile[98]='RATB';
agenciesFile[99]='US RRB';
agenciesFile[100]='SEC';
agenciesFile[101]='SSS';
agenciesFile[102]='SBA';
agenciesFile[103]='SSA';
agenciesFile[104]='SSAB';
agenciesFile[105]='SIGAR';
agenciesFile[106]='SIGIR';
agenciesFile[107]='STB';
agenciesFile[108]='TVA';
agenciesFile[109]='USAB';
agenciesFile[110]='US ADF';
agenciesFile[111]='CO';
agenciesFile[112]='EAC';
agenciesFile[113]='USIP';
agenciesFile[114]='USICH';
agenciesFile[115]='USIBWC';
agenciesFile[116]='USITC';
agenciesFile[117]='USPS';
agenciesFile[118]='USTDA';

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
