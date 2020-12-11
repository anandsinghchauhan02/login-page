import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import UserPage from "../UserPage/UserPage";
import PublicPage from "../PublicPage/PublicPage";


export default function AuthExample() {
    return (
        <Router>
            <div>
              <ul>
                    <li>
                        <Link to="/public">User Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Login</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/public">
                        <PublicPage />
                    </Route>
                    <Route path="/users">
                        <UserPage />
                    </Route>
                    <Route path="/login">
                        <LoginForm/>
                        {/* <LoginPage /> */}
                    </Route>
                    <PrivateRoute path="/protected">
                        <AuthButton/>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

function AuthButton() {
    let history = useHistory();

    return fakeAuth.isAuthenticated ? (
        <p>
            <UserPage />
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push("/public"));
                }}
            >
                Sign out
      </button>
        </p>
    ) : (
            <p>You are not logged in.</p>
        );
}

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                fakeAuth.isAuthenticated ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}


