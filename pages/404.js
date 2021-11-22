export default function Custom404() {
    return <h1>404 - Page Not Found</h1>
}


function Cart() {
    var obj = {};
    var checkout = function(){
        console.log('Checkout')
    }
    this.purchase = function () {
        console.log('purchase');
        checkout();
    }

    obj.checkout = checkout;
    return obj;
}

var cart = new Cart();