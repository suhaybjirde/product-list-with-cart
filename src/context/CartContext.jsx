import { useContext, createContext, useReducer, useEffect } from "react";

const cartContext = createContext(null)

export const ACTIONS = {
    ADDTOCART: 'add-to-cart',
    ADDONEITEM: 'add-one-item',
    REMOVEONEITEM: 'remove-one-item',
    REMOVEITEM: 'remove-item',
    CLEARCART: 'clear-cart'
}

const cartReducer = (state, action)=> {
    switch (action.type) {
        case ACTIONS.ADDTOCART:
            return [
                ...state,
                {
                    productName: action.payload.name,
                    productId: action.payload.id,
                    productCount: 1, 
                    productThumbnail: action.payload.thumbnail,
                    productPrice: action.payload.price
                }
            ]
        case ACTIONS.ADDONEITEM: 
            return state.map(product => product.productId == action.payload.id ? {...product, productCount: product.productCount + 1} : product)
        case ACTIONS.REMOVEONEITEM:
            const update = state.map(product => product.productId == action.payload.id ? {...product, productCount: product.productCount - 1} : product)
            return update.filter(product => product.productCount > 0)
        case ACTIONS.REMOVEITEM:
            return state.filter(product => product.productId !== action.payload.id )

        case ACTIONS.CLEARCART:
            return []
        default:
            throw new Error("unknown action")
    }
} 

const CartContextProvider = ({children})=> {
    const [carts, dispatch] = useReducer(cartReducer, null, ()=> {
        let intial = localStorage.getItem('carts')
        return intial ? JSON.parse(intial) : [] 
    })
    
    let totalPrice = 0
    carts.forEach(product => totalPrice += product.productPrice * product.productCount)

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
    return context
}

export default CartContextProvider