var http = require('http');
var data = require('./cards2.json');
//console.log(data);
console.log('Value of Value1 is ' + data[0].CARD);

Time = new Date();
console.log(Time);


//var result = [
//  {
//   server: 'deskes.com',
//    result: 'succes'
//
//  },
//     {
//    server: 'cleantarge.com',
//    result: 'Failed'
//
//  },
//     {
//    server: 'fance34.com',
//    result: 'success'
//
//  },{
//    server: 'deskes.com',
//    result: 'Failed'
//
//  }
//];




//var rta =  data.filter(
//   (it) => {
//     return it.card === '1054272';
//   }
//);

//console.log(rta[0].card);

var routing = {
'/': 'Welcome to DU', 
'/card': data,
'/card/': data, 
'/card/card': function() { return data[0].CARD; },
'/card/card/': function() { return data[0].CARD; }, 
'/card/phone': function() { return data[0].phone; }, 
//'/card/*': function(client, par),
//Карты
//var rta =  data.filter((it) => {return it.card === par[0];return rta[0].card;});

'/card/find/*': function(client, par)
				{		//проверка есть ли карта!!
					fCard = data.filter(sCard => sCard.CARD == par[0]);
					console.log(fCard);
					if(!!!fCard)
							return 'not found';
							
							
					else
							result = fCard[0].SUMM;
							return result;
							console.log(result);
						},
						
'/card/*': function(client, par)
				{		//проверка есть ли карта!!
					if(!!!data[par[0]])
							return 'not found';
					else
						return data[par[0]].CARD;
				},

				

}; 

var types = { 
object: function(o) { return JSON.stringify(o); }, 
string: function(s) { return s; }, 
number: function(n) { return n + ''; }, 
undefined: function() { return 'not found'; }, 
function: function(fn, par, client) { return fn(client, par); },
}; 

var matching = []; 
for (key in routing) { 
if (key.indexOf('*') !== -1) { 
var rx = new RegExp(key.replace('*', '(.*)')); 
matching.push([rx, routing[key]]); 
delete routing[key]; 
} 
} 

function router(client) { 
var rx, par, route = routing[client.req.url]; 
if (route === undefined) { 
for (var i = 0, len = matching.length; i < len; i++) { 
rx = matching[i]; 
par = client.req.url.match(rx[0]); 
if (par) { 
par.shift(); 
route = rx[1]; 
break; 
} 
} 
} 
var renderer = types[typeof(route)]; 
return renderer(route, par, client); 
} 

http.createServer(function (req, res) { 
res.end(router({ req: req, res: res }) + ''); 
}).listen(81);