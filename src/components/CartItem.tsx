import { Actions, cartContextType, CartType } from "@/context/CartContext"

type CartItemProps = CartType & {
    dispatch: React.ActionDispatch<[action: Actions]>;
    dialog?: boolean
}

const CartItem = ({
    id,
    quantity,
    price,
    name,
    thumbnail,
    dialog,
    dispatch
}: CartItemProps
)=> (
    <div className="flex items-center py-4 gap-3">
        {dialog && <div className="w-[50px] rounded-md overflow-hidden"><img src={thumbnail} alt="product thumbnail" /></div>}
        <div>
            <h3 className="font-semibold pb-2 text-rose-900">{name}</h3>
            <p className="flex gap-3 ">
                <span className="text-red font-semibold">{quantity}x</span> 
                <span className="text-rose-400">@ ${price.toFixed(2)}</span>
                {!dialog && (<span className="text-rose-500">${(quantity * quantity).toFixed(2)}</span>)}
            </p>
        </div>
        {!dialog && (
            <button className="group transition-all hover:outline-rose-900 outline outline-1 outline-rose-400 p-1 ml-auto rounded-full p" onClick={()=> dispatch({type: 'remove-item', payload: {id: id}})}>
                <svg className="group-hover:fill-rose-900 transition-all ease-in" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="hsl(7, 20%, 60%)" viewBox="0 0 10 10"><path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </button>
        )}
        {dialog && (<span className="text-rose-900 font-semibold ml-auto">${(quantity * quantity).toFixed(2)}</span>)}
    </div>
)


export default CartItem