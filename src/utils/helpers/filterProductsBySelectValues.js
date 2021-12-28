

export const filteredProductsBySelect = (myArray, myFilter) => {
   let filtered = []
   for(var arr in myArray){
   for(var filter in myFilter){
       if(myArray[arr].origin === myFilter[filter].value){
          filtered.push(myArray[arr]);
         }
   }
}
return filtered
}
