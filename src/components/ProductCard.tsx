import { useCart } from "../context/CartContext"
import cartIcon from '../assets/images/icon-add-to-cart.svg'

type ProductCartProps = {
    image: {
        mobile: string
        tablet: string
        desktop: string
        thumbnail: string
    },
    name: string,
    category: string,
    price: number,
    id: number,
    quantity?: number
}

function ProductCard({
    image: {
        mobile,
        tablet,
        desktop,
        thumbnail, 
    },
    name,
    category,
    price,
    id,
    quantity
}: ProductCartProps) {
    const {dispatch} = useCart()
    return (
        <article className="w-full md:w-[270px] relative">
            <div className={`rounded-md overflow-hidden ${quantity && 'outline outline-2 outline-red'}`}>
                <picture>
                    <source srcSet={desktop} media="(min-width: 800px)" />
                    <source srcSet={tablet} media="(min-width: 600px)" />
                    <img src={mobile} alt="product image" className=""/>
                </picture>
            </div>
            {
                !quantity ? (<button className="hover:outline-red hover:text-red transition-all group absolute w-[60%] bg-white outline outline-1 outline-rose-500 px-6 py-2 gap-2 rounded-full text-nowrap left-1/2 -translate-x-1/2 -translate-y-1/2  text-sm flex items-center justify-center" onClick={()=> dispatch({type: 'add-to-cart', payload: {name, thumbnail, price, id}})}><img src={cartIcon} alt="cart icon" className="w-4"/><span>Add to Cart</span></button>)
                : (
                    <div className="flex items-center justify-between gap-5 bg-red absolute px-6 py-2 w-[60%]  rounded-full text-nowrap left-1/2 -translate-x-1/2 -translate-y-1/2  text-white">
                        <button onClick={()=> dispatch({type: 'add-one-item', payload: {id}})} className="group hover:bg-white transition-all rounded-full outline outline-1 p-1"><svg 
                        className="group-hover:fill-red transition-all" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#fff" viewBox="0 0 10 10"><path  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></button>
                        <p>{quantity}</p>
                        <button onClick={()=> dispatch({type: 'remove-one-item', payload: {id}})} className="group hover:bg-white transition-all rounded-full outline outline-1 py-2 px-1"><svg className="group-hover:fill-red transition-all" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="#fff" viewBox="0 0 10 2"><path  d="M0 .375h10v1.25H0V.375Z"/></svg></button>
                    </div>
                )
            }
            <div className="mt-5">
                <p className="text-rose-500 text-sm">{category}</p>
                <h2 className="font-bold text-rose-900">{name}</h2>
                <p className="text-red font-bold">${price.toFixed(2)}</p>
            </div>
        </article>
    )
}

export default ProductCard