import '../css/App.css'
import Products from './Products';
import Navbar from './Navbar';
import { useEffect, useState } from 'react'

export default function App() {

    const [products, setProducts] = useState([]);
    const [itemInCart, setItemInCart] = useState([]);

    function click(name, img, price, id, stock) {

        const existingItem = itemInCart.find((el) => el.id === id);

        if (existingItem) {
            // Finns det ett item, uppdatera amount med +1
            const updatedItems = itemInCart.map((item) => {
                if (stock > item.amount) {
                    return item.id === id ? { ...item, amount: item.amount + 1 } : item
                } else {
                    return item;
                }
            });

            setItemInCart(updatedItems);
        } else {
            // finns inte det ett item, lägg till en ny
            setItemInCart([...itemInCart, { name: name, img: img, price: price, id: id, stock: stock, amount: 1 }]);
        }
    };

    async function getProducts() {

        const response = await fetch(`https://slutprojektavjs-default-rtdb.europe-west1.firebasedatabase.app/Products.json`);
        const data = await response.json();

        if (Array.isArray(data)) {

            const newProd = data.map(p => {
                return {
                    stock: p.stock,
                    name: p.name,
                    price: p.price,
                    img: p.img,
                    id: p.id
                }
            })
            setProducts(newProd);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <Navbar inCart={itemInCart} setItemInCart={setItemInCart} />
            <div className='container'>
                {products.map(product => <Products id={product.id} key={product.id} img={product.img} name={product.name} stock={product.stock} price={product.price} handleClick={click} />)}
            </div>
        </>
    )
}