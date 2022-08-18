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
            <>
              <div className="">
                <strong>{product.name}</strong>{" "}
                <span>
                  <small>
                    ({product.categoryName} - {product.brandName})
                  </small>
                </span>
                <hr />
              </div>
              <div key={product.gtin} className="grid grid-cols-3 gap-4">
                <div className="w-32 h-auto py-4">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="flex flex-row items-center">
                  <div>
                    {product.recommendedRetailPriceCurrency}
                    {product.recommendedRetailPrice}
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default ProductList;
