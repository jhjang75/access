// - Yunee Inventory, 08/09/2021~08/13/2021 -
var http = require('http');
var url = require('url');
var queenny = require('./lib/queenny');

app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
        if(queryData.id === undefined){
           queenny.home(request, response);
        } else {
           queenny.page(request, response);
        }
    //} else if(pathname === '/create'){
        //queenny.create(request, response);
    //} else if(pathname === '/create_process'){
        //queenny.create_process(request, response);
    } else if(pathname === '/update'){
        queenny.update(request, response);
    } else if(pathname === '/update_process'){
        queenny.update_process(request, response);
    //} else if(pathname === '/delete_process'){
        //queenny.delete_process(request, response);
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
}).listen(8080);