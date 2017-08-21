function tabSwitch(new_tab, new_content) {

	document.getElementById('tab-featured').style.display = 'none';
	document.getElementById('tab-recent').style.display = 'none';
	document.getElementById('tab-popular').style.display = 'none';
	document.getElementById('tab-glance').style.display = 'none';
	document.getElementById(new_content).style.display = 'block';

	document.getElementById('tab01').className = '';
	document.getElementById('tab02').className = '';
	document.getElementById('tab03').className = '';
	document.getElementById('tab04').className = '';
	document.getElementById(new_tab).className = 'active';

}
function tabSwitch_2(active, number, tab_prefix, content_prefix) {

	for (var i=1; i < number+1; i++) {
	  document.getElementById(content_prefix+i).style.display = 'none';
	  document.getElementById(tab_prefix+i).className = '';
	}
	document.getElementById(content_prefix+active).style.display = 'block';
	document.getElementById(tab_prefix+active).className = 'active';

}
