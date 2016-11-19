/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 changeselectedelement = function(element){
    
    var old = document.getElementsByClassName("current")[0];
    old.classList.remove('current');
    element.classList.add('current');
    
};


