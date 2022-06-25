import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import matchesHttp from "../lib/http/matchesHttp";
export const MatchContext = createContext();

export default function MatchProvider({ children }) {
  const [matches, setMatches] = useState([]);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fields = [
    { key: "id" },
    { key: "name" },
    { key: "level" },
    { key: "status" },
    { key: "organizer" },
    { key: "organizer_email" },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  const getMatches = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const { data } = await matchesHttp.getListMatches();
      setMatches(data);
    } catch (error) {
      setIsError(true);
      setError(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const toggleDetails = useCallback(
    (index) => {
      const position = details.indexOf(index);
      let newDetails = details.slice();
      if (position !== -1) {
        newDetails.splice(position, 1);
      } else {
        newDetails = [...details, index];
      }
      setDetails(newDetails);
    },
    [details]
  );

  return (
    <MatchContext.Provider
      value={{
        matches,
        isLoading,
        isError,
        error,
        fields,
        modal,
        details,
        toggle,
        toggleDetails,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}
