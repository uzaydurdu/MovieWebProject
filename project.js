const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


//UI objesini başlatma
const ui = new UI();

//Storage objesi üretme
const storage = new Storage();

//Tüm Eventleri Yükleme
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //hata
        ui.displayMessage("Lütfen tüm inputları doldurun.","danger");
    }
    else{

        const newFilm = new Film(title,director,url);
        ui.addToUI(newFilm);//Arayüze film ekleme
        storage.addFilmToStorage(newFilm);//Storage film ekleme
        ui.displayMessage("Film başarıyla eklendi.","success");
    }
    
    ui.clearInputs(titleElement,directorElement,urlElement);



    e.preventDefault();
}
function deleteFilm(e){
    
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmToStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessage("Silme işlemi başarılı.","success");
    }
}
function clearAllFilms(){

        if(confirm("Emin misiniz ?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
}
