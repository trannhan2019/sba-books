import { useMounted } from "@/hooks/useMounted";
import { useState } from "react";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useBooks = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    books: [],
    booksCount: 0,
  });

  const getCustomers = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers(search);

      if (isMounted()) {
        setState({
          customers: response.data,
          customersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(
    () => {
      getCustomers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return state;
};

const Book2 = () => {
  return <div>Book2</div>;
};

export default Book2;
