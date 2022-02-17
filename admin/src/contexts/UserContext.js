import {
    createContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
  } from "react";

  import usersHttp from '../lib/http/usersHttp'
  export const UserContext = createContext();

  export default function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const fields = [
      { key: "id" },
      { key: "firstName" },
      { key: "lastName" },
      { key: "email" },
      { key: "birthday" },
      { key: "level" },
      { key: "status" },
      { key: "enable" },
    ]
    const getUsers = useCallback(async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { data } = await usersHttp.getListUsers();
        setUsers(data);
      } catch (error) {
        setIsError(true);
        setError(error);
      }
      setIsLoading(false);
    }, []);

    const getBadge = (status) => {
      switch (status) {
        case "active":
          return "success";
        case "inactive":
          return "secondary";
        case "pending":
          return "warning";
        default:
          return "primary";
      }
    }

    useEffect(() => {
      getUsers();
    }, [getUsers]);


    const value = useMemo(() => {
      return {
        fields,
        users,
        currentUser,
        isLoading,
        isError,
        error,
        getBadge,
        getUsers,
        setCurrentUser,
      };
    }, [
      fields,
      users,
      currentUser,
      isLoading,
      isError,
      error,
      getBadge,
      getUsers,
      setCurrentUser,
    ]);

    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    );
  }
