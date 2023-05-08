export default function Cart({ inCart, setItemInCart }) {
    console.log('inCart', inCart);
    let totalSum = 0;
    return (
        <div className="showCart">
            <h2>Your cart</h2>
            {inCart.map(prod => {
                { totalSum += parseInt(prod.price) * prod.amount }
            })}

            <h2>Total: {totalSum} SEK</h2>

            {inCart.length > 0 ? inCart.map(prod => {

                return (
                    <div>
                        <div>
                            <img src={prod.img} />
                            <p>{prod.name}</p>
                            <p>{prod.price}SEK</p>
                            <p>Amount: {prod.amount}</p>
                        </div>
                    </div>
                )
            }) : <p>Empty</p>}

            <button className="exitButton" onClick={() => {
                inCart.forEach(item => {
                    patchStock(item.id, item.amount, item.stock);
                });
                alert("Purchase was successful")
            }}>Buy</button>
            <button className="exitButton" onClick={emptyCart}>Empty</button>
        </div>
    )

    async function emptyCart() {
        setItemInCart([]);
    }

    async function patchStock(id, amount, stock) {
        const url = `https://slutprojektavjs-default-rtdb.europe-west1.firebasedatabase.app/Products/${id}.json`;
        const newStock = parseInt(stock - amount)

        const updateStock = {
            "stock": newStock
        }
        const options = {
            method: "PATCH",
            body: JSON.stringify(updateStock),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        const response = await fetch(url, options);
        const data = await response.json();
        setItemInCart([]);
        location.reload();
    }
}