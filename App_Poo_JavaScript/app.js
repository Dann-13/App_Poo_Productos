class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;

    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Deleate</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }
    resetForm(){
        document.querySelector('[data-name]').value = '';
        document.querySelector('[data-price]').value = '';
        document.querySelector('[data-year]').value = '';
    }
    deleteProduct(element) { //comprobaremos si el elemento tiene name en el producto
       // que dio clcik el usuario para eiminarlo en especifico
        if(element.name === 'delete'){ //si dio clic en un elemento que contoene name lo eliminara
            element.parentElement.parentElement.parentElement.remove(); //nos traera el elemento padre en el que esta contenido el boton delete
            this.showMesssage('Product deleted succesfully', 'info');//Lllamamos la misma funcion de abajo con this
        }


    }
    showMesssage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app); //estara antes de app
        setTimeout(function(){
            document.querySelector('.alert').remove();
        } , 3000);
    }
}

//DOM
const formulario = document.querySelector('[data-form]');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const year = document.querySelector('[data-year]').value;
    const product = new Product(name, price, year);  
    const ui = new UI();
    
    if (name === '' || price === '' || year === ''){
        return ui.showMesssage("Complete Fieild please",'danger');
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMesssage('Product addded successfully', 'success');
});

const product__list =  document.getElementById('product-list');
product__list.addEventListener('click', (event) => {
    const ui = new UI();
    ui.deleteProduct(event.target);
});