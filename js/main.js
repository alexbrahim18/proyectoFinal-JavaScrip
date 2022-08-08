


function errorMonto (){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un Valor Valido!',
        confirmButtonColor:  '#7FD8BE',
      })
}




class  cuot{
    constructor (numCuota,capital, amortizacion, intereses , cuota ,saldo) {
        this.numCuota = parseFloat(numCuota);
        this.capital = parseFloat(capital);
        this.amortizacion = parseFloat(amortizacion);
        this.intereses = parseFloat(intereses);
        this.cuota = parseFloat(cuota);
        this.saldo = parseFloat(saldo);
        
    }
}

const tabla = [];

function sistFrances (monto,periodos,tasa){
   
    let cuota = (monto /((1-((1+tasa)**-periodos))/tasa)).toFixed(2)
    console.log(cuota)
    let capital =monto;
    for (let i = 0 ; i < periodos; i++){
        
        let intereses = (capital * tasa).toFixed(2);
        let amortizacion = (cuota - intereses).toFixed(2);
        let saldo = (capital - amortizacion).toFixed(2);
        tabla.push(new cuot(i,capital,amortizacion,intereses,cuota,saldo));
        capital= saldo;
    }

}

function crearTabla(table){
    let filas = "";
    let tables = table;
    for( cuot of tables){
        filas += ` <tr>
        <th scope="row">${cuot.numCuota}</th>
        <td>${cuot.capital}</td>
        <td>${cuot.amortizacion}</td>
        <td>${cuot.intereses}</td>
        <td>${cuot.cuota}</td>
        <td>${cuot.saldo}</td>
      </tr>`
    }

    document.getElementById("tablas").innerHTML =`<table class="table table-warning table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Capital</th>
        <th scope="col">Amortizacion</th>
        <th scope="col">Intereses</th>
        <th scope="col">Cuota</th>
        <th scope="col">Saldo Deudor</th>
      </tr>
    </thead>
    <tbody>${filas}</tbody>
    </table>`;
}



fetch('js/cotizacion.json')
.then((response) => response.json())
.then((data) => {
    
    const cotiz = document.getElementById("cotizaciones");
    data.forEach(valor => {
       let card = document.createElement("div");
       card.className = "card  mb-3";
       card.style = "background-color:#7FD8BE;"
       let cardBody = document.createElement("div");
       cardBody.className = "card-body";
       let cardTitu = document.createElement("h5");
       cardTitu.className = "card-title";
       cardTitu.innerHTML = `</b>${valor.nombre}</b>`;
       let cardText = document.createElement("p");
       cardText.className = "card-text";
       cardText.innerHTML = `Compra : ${valor.compra} Venta : ${valor.venta}`;
        cardBody.appendChild(cardTitu);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        cotiz.appendChild(card);
       
    });
    
});





let boton1 = document.getElementById("calc");
boton1.onclick = () => {
    let tasa = document.getElementById("tasa").value;
    let tasaPorcent = tasa / 100 ;
    let monto = document.getElementById("monto").value;
    let periodos = document.getElementById("periodos").value;

    sistFrances(monto,periodos,tasaPorcent);
    
    if (tabla.length === 0){
        errorMonto();
    } else{
        crearTabla(tabla);
        const tablaJSON = JSON.stringify(tabla);
        localStorage.setItem("calculo",tablaJSON);
    } 
};



let boton2 = document.getElementById("historial");
boton2.onclick = () =>{
    const historial = JSON.parse(localStorage.getItem("calculo"));
        crearTabla(historial);
    
    };














