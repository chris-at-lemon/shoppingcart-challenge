import Image from "next/image";
import { useProductList } from "./productListController";
import PagBtns from "../buttons/paginationBtns";
import Button from "../buttons/button";
import PageCount from "../counters/pageCount";

const ProductList = () => {
  const { productList, currentPage, productCount, prodPerPage, fn } = useProductList();

  return (
    <div className="container">
      <div className="pb-4 flex justify-end items-center">
        <div className="mr-4">
          <PageCount count={currentPage} productCount={productCount} prodPerPage={prodPerPage} />
        </div>
        <div>
          <PagBtns nextPage={fn.getNextPage} prevPage={fn.getPrevPage} />
        </div>
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
                <div className="flex flex-row items-center justify-end">
                  <div className="mr-4" onClick={() => fn.handleAddToCart(product.gtin, product.name, product.recommendedRetailPrice)}>
                    <Button label="add to cart" />
                  </div>
                  <div onClick={() => fn.handleRemoveFromCart(product.gtin, product.name, product.recommendedRetailPrice)}>
                    <Button label="remove from cart" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
