function myFunction() {
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var s=ss.getActiveSheet();
  var c=s.getActiveCell();
  var fldr=DriveApp.getFolderById("18SXHIXtGk_Clm0pxtOpPRdW-BpuR740_");
  var files=fldr.getFiles();
  
  var names=[], links=[];
  var f, name, directURL;
  
  while (files.hasNext()) {
    f=files.next();
    
    directURL = f.getUrl().replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1");
    name = f.getName().split(/(\s+)/);  
    
    //I had to use only the first part of the name hence I used name[0]. You could directly use f.getName() for the full file name;
    names.push(['concat("","' + name[0] + '")']);
    links.push(['concat("","' + directURL + '")']);
  }
  
  s.getRange(c.getRow(),c.getColumn(),names.length).setFormulas(names);
  s.getRange(c.getRow(),c.getColumn()+1,links.length).setFormulas(links);
}
