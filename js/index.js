
const offcanvasBody = document.querySelector('.offcanvas-body');

const cartProducts = document.querySelector('.cart-product');

allProducts = JSON.parse(localStorage.getItem('carrito')) || [];

const totalContainer = document.querySelector('.total-container');
const totalH2 = document.querySelector('.total-h2');

cartProducts.addEventListener('click', e => {
   if(e.target.classList.contains('btn-selector')){
      
      const cardBody = (e.target.parentElement)
      const infoProduct = {
         quantity: 1,
         title: cardBody.querySelector('h5').textContent,
         price: cardBody.querySelector('p').textContent,
      };
      const exits = allProducts.some(product => product.title === infoProduct.title);
      if (exits){
         const products = allProducts.map(product => {
            if(product.title === infoProduct.title){
               product.quantity++;
               return product;
            }else {
               return product;
            }
         })
         allProducts = [...products];
      } else{
         allProducts = [...allProducts, infoProduct];
      }
      
      showHTML(saveLocal());
      
   }
   console.log(allProducts)
})


offcanvasBody.addEventListener('click', (e) => {
   if(e.target.classList.contains('btn-close')){
      const product = e.target.parentElement;
      const title = product.querySelector('h6').textContent;

      allProducts = allProducts.filter(product => product.title !== title);

      showHTML(saveLocal());
   }
})


const showHTML = () => {
   offcanvasBody.innerHTML = '';

   let total = 0;
   let totalProducts = 0;

   allProducts.forEach(product => {
      const containerProduct = document.createElement('div');
      containerProduct.classList.add('cart-product');
      containerProduct.innerHTML = `
         <div class="offcanvas-body">

            <div class="card m-4">
               <div class="card-body d-flex justify-content-center align-items-center flex-column">
               <button type="button" class="btn-close"></button>
                  <h5 class="card-title text-center">${product.quantity}</h5>
                  <h6 class="card-title text-center">${product.title}</h6>
                  <p class="card-text text-center price">${product.price}</p>
               </div>
            </div>
         </div> 
         `
      offcanvasBody.append(containerProduct);
      total = 
         total + parseInt(product.quantity * product.price.slice(1));
      totalProducts = totalProducts + product.quantity;
   });
   
   totalContainer.innerText = `$${total}`;
   totalH2.innerText = totalProducts;
}

const saveLocal = () => {
   localStorage.setItem('carrito', JSON.stringify(allProducts));
}



