import { nextPage, NextPageOptions } from './utils';

describe('nextPage function', () => {
  it('should increment the page when moving forward within the page limit', () => {
    const totalPages = 5;
    const prevPage = 2;

    const result = nextPage(NextPageOptions.forward, prevPage, totalPages);
    expect(result).toBe(3);
  });

  it('should decrement the page when moving backward within the page limit', () => {
    const totalPages = 5;
    const prevPage = 2;

    const result = nextPage(NextPageOptions.backward, prevPage, totalPages);
    expect(result).toBe(1);
  });

  it('should reset to the first page (0) when at the last page (totalPages - 1) and moving forward', () => {
    const totalPages = 5;
    const prevPage = totalPages - 1;

    const result = nextPage(NextPageOptions.forward, prevPage, totalPages);
    expect(result).toBe(0);
  });

  it('should reset to the last page (totalPages - 1) when at the first page (0) and moving backward', () => {
    const totalPages = 5;
    const prevPage = 0;

    const result = nextPage(NextPageOptions.backward, prevPage, totalPages);
    expect(result).toBe(totalPages - 1);
  });

  it('should return first page (0) if an invalid direction is provided', () => {
    const totalPages = 5;
    const prevPage = 3;

    const result = nextPage(
      '3' as unknown as NextPageOptions,
      prevPage,
      totalPages
    );
    expect(result).toBe(0);
  });
});
