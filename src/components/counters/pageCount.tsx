interface IPgCount {
  count: number;
  productCount: number;
  prodPerPage: number;
}

const PageCount = (props: IPgCount) => {
  const { count, productCount, prodPerPage } = props;
  return (
    <div>
      {" "}
      Page {count} of {productCount / prodPerPage}
    </div>
  );
};

export default PageCount;
