import { useCart } from '../context/CartContext'
import products from '../data.json'
import ProductCard from './ProductCard'


const ProductItems = ()=> {
    const { carts } = useCart()

    const isProductInCart = (productId) => {
        return carts.filter((item) => item.productId === productId);
    };

    const filtered = products.map(product => {
        let item = isProductInCart(product.id)
        
        if (item[0]) {
            return <ProductCard key={product.name} {...product} {...item[0]} />
        }
        else 
           return <ProductCard key={product.name} {...product} />
    })
    return (
        <div className='col-span-2'>
            <h1 className='text-4xl font-bold mb-4 font-redhat'>Desserts</h1>
            <div className='flex flex-wrap gap-6 '>{filtered}</div>
        </div>
    )
}

export default ProductItems