function Storage(){

}
Storage.prototype.addFilmFromStorage = function(newFilm){

    let films = this.getFilmFromStorage();
    films.push(newFilm);
    localStorage.setItem("films",JSON.stringify(films));
}
Storage.prototype.getFilmFromStorage = function(){
    
    let films;

    if(localStorage.getItem("films") === null){
        films = [];
    }
    else{
        films = JSON.parse(localStorage.getItem("films"));
    }
    return films;
}
Storage.prototype.deleteFilmFromStorage = function(title){
    let films = this.getFilmFromStorage();

    films.forEach(function(film,index){
        if(film.title === title){
            films.splice(index,1);
        }
    });
    localStorage.setItem("films",JSON.stringify(films));//films arrayini stringe çevirerek tekrar locale set etmezsek silmemiş oluruz.
    
}
Storage.prototype.deleteAllFilmStorage = function(){
    localStorage.removeItem("films");
}