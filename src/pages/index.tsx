import ProductList from "../components/productsList/productList";
import Cart from "../components/cart/cart";

const HomePage = () => (
  <div className="container mx-auto">
    <div className="grid grid-cols-4 gap-16">
      <main role="main" className="col-span-4 md:col-span-3">
        <ProductList />
      </main>
      <section className="col-span-4 md:col-span-1">
        <Cart />
      </section>
    </div>
  </div>
);

export default HomePage;
