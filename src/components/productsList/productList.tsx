import { useProductList } from "./productListController";
import PagBtns from "../buttons/paginationBtns";
import Button from "../buttons/button";
import PageCount from "../counters/pageCount";

const ProductList = () => {
  const { productList, currentPage, productCount, prodPerPage, fn } = useProductList();

  return (
    <>
      <div className="pb-4 flex justify-between items-center">
        <div className="text-xl font-bold">Our products</div>
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
            <div className="rounded shadow-md p-4 mb-4 border-2" key={product.gtin}>
              <div className="lg:flex pb-2 border-b-2">
                <div>
                  <strong>{product.name}</strong>{" "}
                </div>
                <div>
                  <small>
                    ({product.categoryName} - {product.brandName})
                  </small>
                </div>
              </div>
              <div className="flex flex-row justify-between flex-wrap">
                <div className="w-1/2 md:w-1/4 lg:w-1/4 py-4">
                  <img className="w-24" src={product.imageUrl} alt={product.name} />
                </div>
                <div className="w-1/2 md:w-1/4 lg:w-1/4 flex flex-row items-center justify-end lg:justify-center">
                  <div>
                    {product.recommendedRetailPriceCurrency}
                    {product.recommendedRetailPrice}
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-row items-center justify-end lg:justify-end">
                  <div className="mr-4" onClick={() => fn.handleRemoveFromCart(product.gtin, product.name, product.recommendedRetailPrice, product.recommendedRetailPriceCurrency)}>
                    <Button label="remove from cart" colour="danger" size="md" />
                  </div>
                  <div onClick={() => fn.handleAddToCart(product.gtin, product.name, product.recommendedRetailPrice, product.recommendedRetailPriceCurrency)}>
                    <Button label="add to cart" colour="primary" size="md" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductList;
