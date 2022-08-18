import ProductList from "../components/productsList/productList";
import Cart from "../components/cart/cart";

const HomePage = () => (
  <div className="container mx-auto">
    <div className="flex flex-row flex-wrap py-4">
      <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
        <ProductList />
      </main>
      <section className="w-full sm:w-1/3 md:w-1/4 px-2">
        <Cart />
      </section>
    </div>
  </div>
);

export default HomePage;
