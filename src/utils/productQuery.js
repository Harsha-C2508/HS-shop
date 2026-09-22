/** Build axios query params from URL search string — skips empty values */
export const buildProductQueryParams = (search) => {
  const params = new URLSearchParams(search);
  const sortBy = params.get('sortBy');
  const q = params.get('q');
  const cats = params.getAll('cat');

  const query = {};
  if (cats.length > 0) query.cat = cats;
  if (sortBy) {
    query._sort = 'price';
    query._order = sortBy;
  }
  if (q) query.q = q;

  return { params: query };
};
