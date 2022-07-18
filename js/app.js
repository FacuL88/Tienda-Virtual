// COMENZANDO CON EL CODIGO. ACA LLAMO A LOS ID QUE TENGO EN EL HTML

const contenidoHeader = document.getElementById('contenidoHeader');
const contenidoMain = document.getElementById('contenidoMain');
const carritoContenedor = document.getElementById('carritoContenedor');
const contenidoFooter = document.getElementById('contenidoFooter');

// ACA CREO DESDE JS UN DIV CON LA CLASE ENLACES, PARA LA UL.

const div = document.createElement('div');
div.classList.add('enlaces');
div.innerHTML = `
<a href="#">Productos</a>
<a href="#">Contacto</a>`

contenidoHeader.appendChild(div);

// CON UN FOREACH RECORRO STOCKPRODUCTOS Y VOY INSERTANDO LAS DESCRIPCIONES

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito ();
    };
});

stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img}>
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar al carrito</button>
    `
    contenidoMain.appendChild(div);
    
    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);
    });
});


const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
    actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
};

const actualizarCarrito = () => {
    carritoContenedor.innerHTML = "";

    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = ('productoEnCarrito');
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$ ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><img src="./icon/borrar-64.png"></button>
        `

        carritoContenedor.appendChild(div);

        localStorage.setItem('carrito', JSON.stringify(carrito)); 
    });
}