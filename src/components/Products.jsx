export default function Products({ img, name, stock, price, handleClick, id }) {


    return (
        <div className="product">
            <img src={img} />
            <p>{name}</p>
            <p>Stock: {stock}</p>
            <p>Price: {price}SEK</p>

            {stock > 0 ? <button className="addToCart" onClick={() => {
                handleClick(name, img, price, id, stock);
            }}>Add to Cart</button> : <p className="OutOfStock">Out of stock</p>}
        </div>
    )
}