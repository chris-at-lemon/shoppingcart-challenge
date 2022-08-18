import Image from "next/image";
import { useProductList } from "./productListController";

const ProductList = () => {
  const { productList, fn } = useProductList();
  console.log("productList", productList);

  return (
    <div className="container">
      <div>
        <button onClick={() => fn.getProducts(2)}>get products</button>
      </div>
      {productList &&
        productList.map((product) => {
          return (
            <div className="productContainer" key={product.gtin}>
              <div className="">
                <strong>{product.name}</strong>{" "}
                <span>
                  <small>
                    ({product.categoryName} - {product.brandName})
                  </small>
                </span>
                <hr />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-32 h-auto py-4">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="flex flex-row items-center">
                  <div>
                    {product.recommendedRetailPriceCurrency}
                    {product.recommendedRetailPrice}
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <button onClick={() => fn.addToCart(product.gtin, product.name, product.recommendedRetailPrice)}>add to cart</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
