export const productsPerPageFilter = (arr) => {
   return arr.map((number) => ({
        value: number,
        label: number,
      }));
}