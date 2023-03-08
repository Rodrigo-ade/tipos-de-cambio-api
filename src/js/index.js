var myHeaders = new Headers();
myHeaders.append("apikey", "xfu84O47Al2oD2A2SneyHTy1nAy9UShg");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

document.querySelector("#obtener-cambio").onclick = function(){
  let base = document.querySelector('input[name="base"]:checked').value;
  let fecha = String(document.querySelector("#fecha").value);

  esExito = validarFecha(fecha);

  if (esExito){
    if(fecha === ""){
      fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${base}`, requestOptions)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => agregarDatosATabla(respuestaJSON),borrarDatosTabla())
        .catch(error => console.log("error", error));
    }
    else{
      fetch(`https://api.apilayer.com/exchangerates_data/${fecha}&base=${base}`, requestOptions)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => agregarDatosATabla(respuestaJSON),borrarDatosTabla())
        .catch(error => console.log('error', error));
    }
  }
};


function agregarDatosATabla(JSON){
  let fecha = JSON.date;
  let monedaBase = JSON.base;
  let tarifasCambios = JSON.rates;

  completarTituloPedido(fecha,monedaBase);
  completarTablaPedido(tarifasCambios);
};


function completarTituloPedido(fecha,moneda){
  document.querySelector("#tasa-fecha").textContent = `El cambio de 1 ${moneda} para la fecha ${fecha} es:`;
};


const $TABLA_CUERPO = document.querySelector("tbody");

function completarTablaPedido(tarifas){
  Object.keys(tarifas).forEach(moneda => {
    let $conjuntoDatos = document.createElement("tr");
    let $datoA = document.createElement("td");
    $datoA.textContent = moneda;
    let $datoB = document.createElement("td");
    $datoB.textContent = tarifas[moneda];
    $conjuntoDatos.appendChild($datoA);
    $conjuntoDatos.appendChild($datoB);
    $TABLA_CUERPO.appendChild($conjuntoDatos);
  });

  document.querySelector("#tasas-de-cambio").classList.remove("oculto");
};

function borrarDatosTabla(){
  while($TABLA_CUERPO.firstChild){
	  $TABLA_CUERPO.removeChild($TABLA_CUERPO.firstChild);
  }
};
