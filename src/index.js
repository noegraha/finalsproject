import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./styles.css";
import TodoApp from "../src/components/TodoApp";

const App = () => (
  <Router>
    <Navigation />
    <div className="height-100">
      <Route exact path="/" component={Home} />
      <Route path="/todo" component={TodoApp} />
      <Route path="/contact" component={Contact} />
    </div>
    <BottomNav />
  </Router>
);

const Home = () => (
  <div className="height-100">
    Welcome to my website
    <ul>
      <li>You can use our Todo application</li>
      <li>In Contact you can get my Contact information</li>
    </ul>
  </div>
);
const Todo = () => (
  <div>
    <TodoApp />
  </div>
);
const Contact = () => (
  <div>
    Name : Nugraha Triatmaja
    <br />
    email : nugraha.triatmaja@gmail.com
    <br />
    twitter/instagram : @noe_graha
  </div>
);

const BottomNav = () => (
  <Navbar bg="dark" variant="dark" className="text-secondary">
    <span className="text-lowercase">Web</span>
  </Navbar>
);

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef();
  function toggleOnClick() {
    setIsExpanded(prev => !prev);
  }
  function closeCollapse() {
    setIsExpanded(false);
  }
  useOnClickOutside(ref, () => setIsExpanded(false));
  return (
    <Navbar
      expanded={isExpanded}
      onSelect={closeCollapse}
      bg="dark"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect={true}
    >
      <Nav>
        <NavBrand to="/" value="Web" />
      </Nav>
      <Navbar.Toggle onClick={toggleOnClick} aria-controls="basic-navbar-nav">
        <span id="my-toggle" className="navbar-toggler-icon sm" />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" ref={ref}>
        <Nav className="mr-auto">
          <NavItem to="/" value="Home" />
          <NavItem to="/todo" value="Todo" />
          <NavItem to="/contact" value="Contact" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

function useOnClickOutside(ref, cb) {
  useEffect(() => {
    const listener = event => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        event.target.id === "my-toggle"
      ) {
        return;
      }
      cb(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, cb]);
}

const NavItem = ({ to, value }) => (
  <LinkContainer to={to} exact={true} activeClassName="text-danger">
    <Nav.Link active={false}>{value}</Nav.Link>
  </LinkContainer>
);

// highlist the nav brand when 'Home' is selected
const NavBrandHighlight = ({ to, value }) => (
  <LinkContainer
    className="navbar-brand"
    exact={true}
    activeClassName="text-danger"
    to={to}
  >
    <Nav.Link active={false}>{value}</Nav.Link>
  </LinkContainer>
);

const NavBrand = ({ to, value }) => (
  <LinkContainer
    className="navbar-brand"
    exact={true}
    activeClassName="text-danger"
    to={to}
    isActive={() => false}
  >
    <Nav.Link active={false}>{value}</Nav.Link>
  </LinkContainer>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
