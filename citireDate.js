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
                    document.write("<svg >");
                    for (var i =0; i <resul.length; i++) {
                        type.push([resul[i],count[i]]);
                        var poz=i*70+50;
                        var r = Math.floor(Math.random() * 255);

    var g = Math.floor(Math.random() * 255);

    var b = Math.floor(Math.random() * 255);
                        document.write("<rect x=\"0\" y=\""+poz+"\" width=\""+count[i]+"\" height=\"70\" style=\"fill:rgb("+r+","+g+","+b+")\" />");
                    }
                    document.write("</svg>");
                    document.write(type.join());
                
                
                }
                reader.readAsText(fileUpload.files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    }
