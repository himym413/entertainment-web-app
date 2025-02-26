function ShowsListStyled({ children }) {
  return (
    <ul className="mx-4 mb-[20px] grid grid-cols-2 justify-items-center gap-4 customMD:grid-cols-3 md:mx-6 md:mb-[85px] md:mt-6 md:grid-cols-3 md:gap-x-7 md:gap-y-[80px] xl:mx-4 xl:mt-0 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-[84px]">
      {children}
    </ul>
  );
}

export default ShowsListStyled;
