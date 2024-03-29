import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Authentication from './routes/authentication/authentication.component';
import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';
import Footer from './routes/footer/footer.component';

const App = () => {
  return (
    <Fragment>
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='login' element={<Authentication />} />
      </Route>   
    </Routes>
    <ScrollToTop />
    <Footer />
    </Fragment>
  )
}

export default App;
