export enum NextPageOptions {
  forward,
  backward,
}

// Available pages from index 0 to totalPages - 1
export const nextPage = (
  direction: NextPageOptions,
  prevPage: number,
  totalPages: number
) => {
  if (direction === NextPageOptions.forward) {
    if (prevPage + 1 === totalPages) {
      return 0;
    }
    return prevPage + 1;
  }
  if (direction === NextPageOptions.backward) {
    if (prevPage === 0) {
      return totalPages - 1;
    }
    return prevPage - 1;
  }
  return 0;
};
