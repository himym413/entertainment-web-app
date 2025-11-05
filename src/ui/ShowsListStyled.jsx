function ShowsListStyled({ children }) {
  return (
    <ul className="customLGItem4:mx-4 customLGItem4:mt-0 customLGItem4:grid-cols-4 customLGItem4:gap-x-10 customLGItem4:gap-y-[84px] mx-4 mb-[20px] grid grid-cols-2 justify-items-center gap-4 customMD:grid-cols-3 md:mx-6 md:mb-[85px] md:mt-6 md:grid-cols-3 md:gap-x-7 md:gap-y-[80px]">
      {children}
    </ul>
  );
}

export default ShowsListStyled;
