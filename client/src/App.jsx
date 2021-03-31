import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "react-jss";
import theme from "./theme";
import { Home, Room, Create, Join, Profile, About } from "./pages";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Router>
            <Switch>
              <Route path="/room/:name">
                <Room />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/join">
                <Join />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
