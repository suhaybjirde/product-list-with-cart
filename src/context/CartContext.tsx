import { useContext, createContext, useReducer, useEffect, ReactNode } from "react";

export type CartType = {
    name: string
    id: number
    quantity: number, 
    thumbnail: string,
    price: number
}

type CartContextProps = {
    children: ReactNode
}

export type cartContextType = {
    carts: CartType[];
    dispatch: React.ActionDispatch<[action: Actions]>;
    totalPrice: number
}
const cartContext = createContext<cartContextType | null>(null)

export type Actions =
  | { type: "add-to-cart"; payload: Omit<CartType, 'quantity'> }
  | { type: "add-one-item"; payload: { id: number } }
  | { type: "remove-one-item"; payload: { id: number } }
  | { type: "remove-item"; payload: { id: number } }
  | { type: "clear-cart" };

const cartReducer = (state: CartType[], action: Actions): CartType[]=> {
    switch (action.type) {
        case "add-to-cart":
            return [
                ...state,
                {
                    name: action.payload.name,
                    id: action.payload.id,
                    quantity: 1, 
                    thumbnail: action.payload.thumbnail,
                    price: action.payload.price
                }
            ]
        case "add-one-item": 
            return state.map(product => product.id == action.payload.id ? {...product, productCount: product.quantity + 1} : product)
        case "remove-one-item":
            const update = state.map(product => product.id == action.payload.id ? {...product, productCount: product.quantity - 1} : product)
            return update.filter(product => product.quantity > 0)
        case "remove-item":
            return state.filter(product => product.id !== action.payload.id )

        case "clear-cart":
            return []
        default:
            throw new Error("unknown action")
    }
} 

const CartContextProvider = ({ children }: CartContextProps)=> {
    const [carts, dispatch] = useReducer(cartReducer, [], ()=> {
        let intial = localStorage.getItem('carts')
        return intial ? JSON.parse(intial) : [] 
    })
    
    let totalPrice = 0
    carts.forEach(product => totalPrice += product.price * product.quantity)

    useEffect(()=> {
        localStorage.setItem("carts", JSON.stringify(carts))
    }, [carts])

    return (
        <cartContext.Provider value={{carts, dispatch, totalPrice}}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = ()=> {
    const context = useContext(cartContext)
    if (!context) throw new Error("useCart must be used within a Provider")
    return context
}

export default CartContextProvider