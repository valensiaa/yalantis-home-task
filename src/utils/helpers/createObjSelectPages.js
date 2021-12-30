export const productsPerPage = (arr) => {
   return arr.map((number) => ({
        value: number,
        label: number,
      }));
}