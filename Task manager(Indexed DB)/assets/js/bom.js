/*  
Here is the exercise on working on the remaining bom method 

Location , Navigator , screen , Window 

Follow the Instruction on the comments 

1. Declare the UI Variables for selecting on the elements 
2. Use the innerHTML property to display the result on each element 
3. The Text  of the elements will lead you what bom information is required 

Adding Extra is Possible if you want to explore more ...

Good Luck !!! 
*/

// Define UI Variables  here 

let loc = [location.href, location.protocol, location.host, location.port, location.hostname];
let brs = [navigator.appName, navigator.appVersion, navigator.platform, navigator.language, navigator.cookieEnabled];
let screenInfo = [screen.height, screen.width, screen.pixelDepth];
let browsingInfo = [history.length, history.state];

let items = document.querySelectorAll(".collection-item");
for(i = 0; i < 5; i++){
    items[i].children[0].innerHTML=loc[i];
}

for(i = 5; i < 10; i++){
    items[i].children[0].innerHTML=brs[i-5];   
}

for(i = 10; i < 13; i++){
    items[i].children[0].innerHTML=screenInfo[i-10];
}

for(i = 13; i < 15; i++){
    items[i].children[0].innerHTML=browsingInfo[i-13];
}

// Display the BOM Information on the innerHTML of the elements