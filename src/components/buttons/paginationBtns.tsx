interface IButton {
  label: string;
  nextPage: () => void;
  prevPage: () => void;
}

const PagBtns = (props: IButton) => {
  const { label } = props;
  return (
    <div className="inline-flex">
      <button onClick={() => props.prevPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        Prev
      </button>
      <button onClick={() => props.nextPage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        Next
      </button>
    </div>
  );
};

export default PagBtns;
