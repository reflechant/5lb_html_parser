var items = []
var reg = /([0-9]+) г$/

$("div.descr").each(function(){

	var dom = $(this)
	var name = $("div.line > strong",this).text();
	var price = $("div.line.clearfix.price > span.value > b",this).text();
	if (!price) price = Infinity;
	var manufacturer = $("div.line.clearfix:first > span.value > a",this).text();
	var z = $("div.line > strong",this).text().match(reg);

	if (z) 	var weight = z[1];
	else 	var weight = 0;

	var ratio = price / weight;	
	

	
	items.push( [ name,price,weight,ratio,manufacturer,dom ] );
	
});

items = items.sort(
	function(a,b)
	{
		if (a[3] < b[3]) {
			return -1;
		}
		if (b[3] < a[3]) {
			return 1;
		}
		return 0;
	}
);

s = items[0][0];
$("div.line > strong",items[0][5]).text( items[0][3].toFixed(2) + ' руб/г | ' + s );

//for (var i=0; i<50; i++) {
//for (var i in items) {
for (var i=1; i<items.length; i++) {
	items[i][5].closest("li").insertAfter( items[i-1][5].closest("li") );
	s = items[i][0];
	$("div.line > strong",items[i][5]).text( items[i][3].toFixed(2) + ' руб/г | ' + s );
}
