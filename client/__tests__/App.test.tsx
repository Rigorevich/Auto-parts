import { render } from '@testing-library/react';

import { App } from '../src/App';

describe('App', () => {
  test('renders heading', async () => {
    render(<App />);
  });
});
