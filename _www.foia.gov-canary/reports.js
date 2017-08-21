$('a.overviewHelp').qtip({
	content: '<p>To get a general look at a given agency&#39;s FOIA activities, please click on this link. From the given list, you will be able to pick an agency, and then view an overview of that agency&#39;s FOIA data - their At-a-Glance FOIA data the most recent fiscal year available on FOIA.Gov.</p>',
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

var jumpLocation="";

function startRequest(){
var requestString="/foia/Statistics?Type=MostRecent";

	divAjaxData="reportsRecent";
	IEAjaxRequest(requestString);
}

startRequest();
