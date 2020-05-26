function loadDoc(nume_fisier) {
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4)
        {
            if(xhttp.status === 200 || xttp.status == 0)
            {
               var lines=xhttp.responseText;
           
  lines=lines.split("\n");
                    var resul = [];
                    var count = [];
                for (var i = 1; i < lines.length; i++) {
                     
                     var currentline = lines[i].split("\";\"");
                     var j=resul.indexOf(currentline[1]);
                     if(j==-1)
                     {resul.push( currentline[1]);count.push(1);}
                     else
                        count[j]++;
                    }
                

                    var type =count.slice();
                    type.sort(function(a, b){return a - b});
                    var ci=255/type.length;
                    var creare=document.getElementById("main");
                    var s="<svg width=\"1200\" height=\"900\" aria-labelledby=\"title\"><title id=\"title\">A bart chart showing information</title>";
                    for (var i =0; i <resul.length; i++) {
                       // type.push([resul[i],count[i]]);
                        var poz=i*60+10;
                        var r = 0;

    var g =255-ci*type.indexOf(count[i]);
    var g2=255-g;

    var b = 255;
                        var w=count[i]/20;
                        var x=100+w;
                        var y=poz+30;
                        if(w>900)
                            x=x/5;
                        s=s+"<g class=\"bar\"><rect x=\"50\" y=\""+poz+"\" width=\""+w+"\" height=\"50\" style=\"fill:rgb("+r+","+g+","+b+")\" /><text color=rgb("+r+","+g2+","+b+") x=\""+x+"\" y=\""+y+"\" dy=\".35em\">"+resul[i]+" ( "+count[i]+" )</text></g>";
                    }
                    s=s+"</svg>";
                    creare.innerHTML =s;
                     }
        }        
  };
  xhttp.open("GET", "parcauto2018.txt", true);
  xhttp.send(null);
                    
}
function buton1()
{
  var text="parcauto2018.txt";
  loadDoc(text);
}
function test() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "parcauto2018.txt", true);
  var lines =[];
  lines=xttp.response();
  lines=lines.split("\n");
  document.write(lines);
}
