// - Yunee Inventory, 08/09/2021~ -
var con = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');

exports.home = function(request, response){
    con.query(`SELECT * FROM queenny`, function(error,results){
        var title = 'Queenny';
        var list = template.list(results);
        var html = template.HTML(title, list,``
            //` <a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
    });
}

exports.page = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    con.query(`SELECT * FROM queenny`, function(error,results){
        if(error){throw error;}
        con.query(`SELECT * FROM queenny WHERE seq=?`,[queryData.id], 
            function(error2, result){
            if(error2){throw error2;}
            var title = result[0].color;
            //var amount = result[0].amount;
            //var remarks = result[0].remarks;
            var list = template.list(results);
            var html = template.HTML(title, list,
                //` <a href="/create">create</a><br>`
                ` <form action="/update_process" method="post">
                    <input type="hidden" name="seq" value="${result[0].seq}">
                    <input type="text" name="color" value="${result[0].color}">
                    <input type="text" name="amount" value="${result[0].amount}">
                    <input type="text" name="remarks" value="${result[0].remarks}">
                    <button type="submit">수정하기</button>
                  </form>`
                  //`<a href="/create">create</a><br>`
                   /* `<p>
                      <input type="text" name="color" value="${result[0].color}">
                    </p>
                    <p>
                      <input type="text" name="amount" value="${result[0].amount}">
                    </p>
                    <p>
                      <input type="text" name="remarks" value="${result[0].remarks}">
                    </p>
                    <p>
                      <button type="submit">수정하기</button>
                    </p>
                  </form>`*/
                /*`  <form action="delete_process" method="post">
                    <input type="hidden" name="seq" value="${queryData.id}">
                    <input type="submit" value="delete">
                  </form>`*/
                /*` <table><tr><td>${title}<td></tr>
                  <tr><td>${amount}<td></tr>
                  <tr><td>${remarks}<td></tr></table>`*/
                //` <a href="/update?id=${queryData.id}">update</a>`
            );
            response.writeHead(200);
            response.end(html);
        });
    });
}

exports.create = function(request, response){
    con.query(`SELECT * FROM queenny`, function(error,results){
        var title = 'Create';
        var list = template.list(results);
        var html = template.HTML(title, list,
          ` <form action="/create_process" method="post">
              <input type="text" name="color" placeholder="Color No.">
              <input type="text" name="amount" placeholder="수량">
              <input type="text" name="remarks" placeholder="비고">
              <input type="submit">
            </form>`
          //` <a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
    });
}

exports.create_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        con.query(`
        INSERT INTO queenny (color, amount, remarks) 
            VALUES(?, ?, ?)`,
        [post.color, post.amount, post.remarks], 
        function(error, result){
            if(error){throw error;}
            //response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.writeHead(302, {Location: `/`});
            response.end();
        });
    });
}

exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    con.query('SELECT * FROM queenny', function(error, results){
        if(error){throw error;}
        con.query(`SELECT * FROM queenny WHERE seq=?`,[queryData.id], function(error2, result){
          if(error2){throw error2;}
          var list = template.list(results);
          var html = template.HTML(result[0].color, list,
            ` <form action="/update_process" method="post">
                <input type="hidden" name="seq" value="${result[0].seq}">
                <p>
                  <input type="text" name="color" value="${result[0].color}">
                </p>
                <p>
                  <input type="text" name="amount" value="${result[0].amount}">
                </p>
                <p>
                  <input type="text" name="remarks" value="${result[0].remarks}">
                </p>
                <p>
                  <button type="submit">수정하기</button>
                </p>
              </form>`
            //` <a href="/update?id=${result[0].seq}">update</a>`
            //` <a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
    });
}

exports.update_process=function(request, response){
    var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          con.query('UPDATE queenny SET color=?, amount=?, remarks=? WHERE seq=?', 
            [post.color, post.amount, post.remarks, post.seq], function(error, result){
            response.writeHead(302, {Location: `/`});
            //response.writeHead(302, {Location: `/update?id=${post.seq}`});
            response.end();
          })
    });
}

exports.delete_process=function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          con.query('DELETE FROM queenny WHERE seq = ?', [post.seq], function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/`});
            response.end();
          });
    });
}