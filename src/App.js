import { Route, Switch } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main'
import Category from './components/Category/Category';
import Card from './components/Cards/Card';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Item from './components/Cards/Item';
import Location from './components/GoogleMap/Location'
import Checkout from './components/Checkout/Checkout';
function App() {
  return (
    <div className="bg-gray-200">
    <Navbar />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/category/:id" component={Category} />
      <Route exact path="/card" component={Card} />
      <Route exact path="/category/:id/:subCategory" component={Category} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/signup" component={Signup} />
      <Route exact path="/products/:id" component={Item} />
      <Route exact path="/location" component={Location} />
      <Route exact path="/checkout" component={Checkout} />
    </Switch>
    
    </div>
  );
}

export default App;
