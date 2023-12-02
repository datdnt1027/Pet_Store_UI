import '../components/css/CheckOut.css';
function Checkout() {
    return (
        <div className="checkout-container">
          <div className="cart-items-container">
            <h1 className="title">Checkout</h1>
            <CartItems />
          </div>
    
          <div className="form">
            <CheckoutForm />
            <button className="place-order-button">Place Order</button>
          </div>
        </div>
      );
    
  }
  
  function CartItems() {

    const items = [
      {
        id: 1,
        name: 'Product 1', 
        price: 29.99,
        image: '/product1.jpg'
      },
      {
        id: 2,  
        name: 'Product 2',
        price: 49.99, 
        image: '/product2.jpg'
      },
      {
        id: 3,
        name: 'Product 3',
        price: 19.99,
        image: '/product3.jpg' 
      },
      {
        id: 4,
        name: 'Product 4',
        price: 12.99,
        image: '/product4.jpg'
      },
      {
        id: 5,  
        name: 'Product 5',
        price: 24.99,
        image: '/product5.jpg'
      }
    ];
  
    return (
      <div className="cart-items-container">
  
        <h2 className="cart-title">Cart Items</h2>
  
        {items.map(item => (
          <div className="item-container" key={item.id}>
  
            <img className="item-image" src={item.image}/>
  
            <div className="item-details">
  
              <p className="item-name">{item.name}</p>
  
              <p className="item-price">${item.price}</p>
  
            </div>
  
          </div>  
        ))}
  
      </div>
    );
  }
  
  
  
  function CheckoutForm() {
  
    return (
  
      <form className="form">
  
        <h2 className="form-title">Checkout Form</h2>
  
  
        
  
        <label className="form-label">
  
          Name
  
          <input className="name-input" type="text" />
  
        </label>
  
        
  
        // other fields
  
      </form>
  
    );
  
  }
  
  export default Checkout;