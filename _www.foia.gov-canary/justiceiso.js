/*
	Global JavaScripts from Justice ISO team
*/


/*
	Global variables
*/
var exitTimeOutFlag;
var exitTIMER = 6000;
var exitUrl;


/*
	Print Friendly function
*/
function PrintPreviewGet(){

	printStr="/PrintOut3.jsp?preview=";
	printStr+=location.pathname;
	window.location=printStr;
	//alert(printStr);
}


function PrintPreview(){

	myform=document.createElement("form");
	myhidden=document.createElement("INPUT");
	myhidden.setAttribute("type","hidden");
	myhidden.setAttribute("name","preview");
	myhidden.setAttribute("value",location.pathname);
	myform.appendChild(myhidden);
	myform.setAttribute("id","printpreview");
	myform.setAttribute("action","/printf/PrintOut3.jsp");
	myform.setAttribute("method","POST");
	mypara=document.getElementsByTagName("div");
	mypara[0].appendChild(myform);
	myform.submit();

}
/*
	Functions to simulating the work of outside.cgi
*/
function exitWinClose(){

  clearTimeout(exitTimeOutFlag);
  var e=document.getElementById("exitMsg");
  if(e != null){
	e.style.display='none';
  }
  var f=document.getElementById("shadowFilter");
  if(f != null){
	f.style.display='none';
  }
}

function exitWinOpen(redirectTo){
  var de = document.documentElement;
  var e=document.getElementById("exitMsg");
  var exitWin;
  if(e != null){
	exitWin="<p align=\"center\"><img src=\"/images/doj-seal-popup.jpg\" /></p>";
	exitWin+="<p align=\"center\" style=\"font-size:16px;font-weight:bold;\">The United States Department of Justice</p>";
	exitWin+="<p align=\"center\" >You are now leaving a Department of Justice Web site.</H2></p>";
	exitWin+="<p>You are about to access:<br />";
	exitWin+="<center><A HREF=\"";
	exitWin+=redirectTo;
	exitWin+="\">";
	exitWin+=redirectTo;
	exitWin+="</A></center></p><p>The Department of Justice does not endorse the organizations or views represented by this site ";
	exitWin+="and takes no responsibility for, and exercises no control over, the accuracy, accessibility, copyright ";
	exitWin+="or trademark compliance or legality of the material contained on this site.</p>";
	exitWin+="<p> Thank you for visiting our site. </p>";
	e.innerHTML=exitWin;
	e.style.display='block';
  }
  var f=document.getElementById("shadowFilter");
  if(f != null){
	f.style.height= document.body.clientHeight +"px";
	f.style.display='block';
	f.style.filter = "alpha(opacity=60)";
	f.onclick=function(){
		exitWinClose();
	}
  }
  exitUrl=redirectTo;
  exitTimeOutFlag=setTimeout("jmpURL()",exitTIMER);
}

function jmpURL(){
  
  document.location=exitUrl;
}

function showPageSize(){
  var de = document.documentElement;
  alert("innerwidth="+window.innerWidth+"Selfinnerwidth="+self.innerWidth+"clientwidth="+(de&&de.clientWidth)+"bodywidth="+document.body.clientWidth);
  alert("innerwidth="+window.innerHeight+"innerwidth="+self.innerHeight+"innerwidth="+(de&&de.clientHeight)+"innerwidth="+document.body.clientHeight);
}

/*
	"Breakout" script
	
*/
if (top.frames.length!=0)
top.location=self.document.location;

