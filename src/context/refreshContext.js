import React, { createContext, useContext, useState } from "react";

const RefreshContext = createContext();

export function RefreshProvider({ children }) {
  const [refreshVersion, setRefreshVersion] = useState(0);

  const refresh = () => {
    setRefreshVersion((v) => v + 1);
  };

  return (
    <RefreshContext.Provider value={{ refreshVersion, refresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export const useRefresh = () => useContext(RefreshContext);
