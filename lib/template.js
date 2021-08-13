// - Yunee Inventory, 08/09/2021~ -
module.exports = {
  HTML:function(title, list, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <meta charset="utf-8">
      <style>
        table, th, td { border: 1px solid black; border-collapse: collapse; }
        table {width:100%;}
        input:focus {outline:none;}
        /* input {width:90%;border:0 solid black;} */
      </style>
    </head>
    <body>
      <!--<h3><a href="/">QUEENNY</a></h3>-->
      <p>${control}</p>
      <table>
        ${list}
      </table>
    </body>
    </html>
    `;
  },
  list:function(results){
    var l=results.length;
    var j=0;
    var list = '<tr>';

    while(j < l/16){
      if(l-(16*(j+1))>=0){
        var n=16*(j+1);
      }else {
        var n=l;
      }
      var m=16*j;

      //color
      var i = m;
      while(i < n){
        list = list + `
        <th bgcolor="#FFFF00">
          <a href="/?id=${results[i].seq}">
            ${results[i].color}
          </a>
        </th>
        `;
        i = i + 1;
      }
      list = list+'</tr>';
      //amount
      list = list+'<tr>';
      var i = m;
      while(i < n){
        list = list + `
        <td align="center">
            ${results[i].amount}
        </td>
        `;
        i = i + 1;
      }
      list = list+'</tr>';
      //remarks
      list = list+'<tr>';
      var i = m;
      while(i < n){
        list = list + `
        <td align="center">
            ${results[i].remarks}
        </td>
        `;
        i = i + 1;
      }
      list = list+'</tr>';
      j=j+1;
      list=list+'<tr>';
    }
    return list;
  }
}