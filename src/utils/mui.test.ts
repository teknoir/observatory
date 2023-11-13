import { expect, test } from 'vitest';
import { a11yProps } from './mui';

test('a11yProps - get props by index', () => {
  const index = 2;
  expect(a11yProps(index)).toEqual({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });
});
