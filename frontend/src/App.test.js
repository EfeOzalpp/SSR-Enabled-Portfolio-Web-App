import { render, screen } from '@testing-library/react';
import frontpage from './FrontPage';

test('renders learn react link', () => {
  render(<frontpage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
