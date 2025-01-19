import Cart from '@components/Cart'
import ProductItems from '@components/ProductItems'
import CartContextProvider from '@context/CartContext'


function App() {
  return (
    <CartContextProvider>
      <main>
        <section className='grid gap-y-8 md:gap-4 sm:grid-cols-3 p-6 grid-cols-1'>
          <ProductItems />
          <Cart />
        </section>
      </main>
    </CartContextProvider>
  )
}

export default App