function validarFecha(fecha){
  if(fecha >= "2000-01-01" || fecha === ""){
    document.querySelector("#fecha").classList.remove("error");
    return true;
  }
  else{
    document.querySelector("#fecha").classList.add("error");
    document.querySelector("#tasas-de-cambio").classList.add("oculto");
    return false;
  }
}
