function Upload() {
        var fileUpload = document.getElementById("fileUpload");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var lines = e.target.result.split("\n");
                    var resul = [];
                    var count =[];
                for (var i = 1; i < lines.length; i++) {
                     var obj = {};
                     var currentline = lines[i].split("\";\"");
                     var j=resul.indexOf(currentline[1]);
                     if(j==-1)
                     {resul.push( currentline[1]);count.push(1);}
                     else
                        count[j]++;
                    }
                    var type =[];
                    var creare=document.getElementById("figure");
                    var s="<svg width=\"1200\" height=\"900\" aria-labelledby=\"title\"><title id=\"title\">A bart chart showing information</title>";
                    for (var i =0; i <resul.length; i++) {
                        type.push([resul[i],count[i]]);
                        var poz=i*60+10;
                        var r = Math.floor(Math.random() * 255);

    var g = Math.floor(Math.random() * 255);

    var b = Math.floor(Math.random() * 255);
                        var w=count[i]/20;
                        var x=100+w;
                        var y=poz+30;
                        if(w>900)
                            x=x/2;
                        s=s+"<g class=\"bar\"><rect x=\"50\" y=\""+poz+"\" width=\""+w+"\" height=\"50\" style=\"fill:rgb("+r+","+g+","+b+")\" /><text x=\""+x+"\" y=\""+y+"\" dy=\".35em\">"+resul[i]+" ( "+count[i]+" )</text></g>";
                    }
                    s=s+"</svg>";
                    creare.innerHTML =s;
                
                
                }
                reader.readAsText(fileUpload.files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    }
