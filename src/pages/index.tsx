import ProductList from "../components/productsList/productList";
import Cart from "../components/cart/cart";

const HomePage = () => (
  <div className="grid grid-cols-8 gap-16 mt-8">
    <main role="main" className="col-span-8 lg:col-span-5">
      <ProductList />
    </main>
    <section className="col-span-8 lg:col-span-3">
      <Cart />
    </section>
  </div>
);

export default HomePage;
