import { useState } from "react"
import { useCart } from "@context/CartContext"
import confirmIcon from '@assets/images/icon-order-confirmed.svg'
import * as Dialog from "@radix-ui/react-dialog";
import CartItem from "@components/CartItem";

const Model = ()=> {
    const [isOpen, setIsOpen] = useState(false)
    const {carts, dispatch, totalPrice} = useCart()

    const closeModel = ()=> {
        dispatch({type: 'clear-cart'})
    }
    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger onClick={()=> setIsOpen(true)} className="bg-red w-full rounded-full p-3 mt-4 hover:bg-dark-red transition-all text-rose-50">Confirm Order</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="w-screen h-screen top-0 left-0 bottom-0 fixed bg-black-300 ">
                    <Dialog.Content className="absolute grid md:top-1/2 bottom-0 left-1/2 -translate-x-1/2 md:-translate-y-1/2 rounded-lg h-full max-h-[96vh] overflow-y-hidden bg-white p-6  w-full max-w-[500px]">
                    <div>
                        <div><img src={confirmIcon} alt="order confirmed icon" /></div>
                        <Dialog.Title className="mt-4 font-bold text-3xl">Order Confirmed</Dialog.Title>
                        <Dialog.Description >
                            <span className="mt-2 text-rose-500 block">We hope you enjoy your food!</span>
                            <div className="bg-rose-100 rounded-md mt-5 p-5 h-full max-h-[363px] overflow-scroll">
                                <ul>
                                    {carts.map(item => 
                                        <li key={item.id} className="border-b border-gray-100 bg-rose-100 px-4">
                                            <CartItem {...item} dialog={true} dispatch={dispatch} />
                                        </li>
                                    )}
                                </ul>
                                <div className="mt-4 mb-3 flex justify-between items-center"><span className="text-rose-900 text-sm">Order Total</span><span className="font-bold text-xl">${totalPrice.toFixed(2)}</span></div>
                            </div>

                        </Dialog.Description>
                    </div>
                        <Dialog.Close className="bg-red w-full hover:bg-dark-red transition-all rounded-full p-3 mt-4 text-rose-50 self-end" onClick={closeModel}>Start New Order</Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Model