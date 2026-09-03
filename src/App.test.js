import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { store } from './Redux/store';

jest.mock('./Pages/MainRoutes', () => {
  return function MockMainRoutes() {
    return <div data-testid="main-routes">HS-shop</div>;
  };
});

test('renders HS-shop app shell', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByTestId('main-routes')).toBeInTheDocument();
});
