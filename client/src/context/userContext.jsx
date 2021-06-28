import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

const UserContext = createContext(null);

/** Generates a new user, informing the backend of their existence. */
async function getUser() {
  const cookies = new Cookies();
  async function getNewUser() {
    return fetch(`/users/new`)
      .then((res) => res.json())
      .then((res) => {
        cookies.set("userId", res.id, { sameSite: "lax", maxAge: 86400 });
        return res;
      });
  }
  const storedId = cookies.get("userId");
  if (storedId !== undefined) {
    return fetch(`/users/get?${new URLSearchParams({ id: storedId })}`)
      .then((res) => res.json())
      .catch(getNewUser); // If user ID in cookie is stale
  }
  return getNewUser();
}

/** Provides a userId to the client when the Provider is rendered. */
function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  // Runs once at beginning and whenever user ID cookie is updated
  useEffect(() => getUser().then((res) => setUser(res)), []);

  useEffect(() => console.log(`USER: ${JSON.stringify(user)}`), [user]);

  /** Requests to rename the user. */
  const setUserName = useCallback(
    (name) => {
      if (user) {
        const params = new URLSearchParams({ id: user.id, name });
        fetch(`/users/setName?${params}`, { method: "PUT" })
          .then((res) => res.json())
          .then((res) => {
            setUser(res);
          });
      }
    },
    [user]
  );

  useEffect(() => {
    if (user && user.id !== userId) {
      setUserId(user.id);
    }
  }, [user, userId]);

  return (
    <UserContext.Provider value={{ userId, user, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/** Provides a context containing a stateful user and functions to modify it. */
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { useUser, UserProvider };
