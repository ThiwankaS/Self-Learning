function printNames( obj : { first : string; last? : string }) : string {
    let printText : string = '';
    if(obj.last !== undefined){
        printText += obj.first.toUpperCase() + ' ' + obj.last.toUpperCase(); 
    } else {
        printText += obj.first.toUpperCase();
    }
    return printText; 
}

console.log(printNames({ first : 'Thiwanka', last : 'Somachandra'}));