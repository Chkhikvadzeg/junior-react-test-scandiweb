import React from "react";

const currencyContext = React.createContext();

export const UserProvider = currencyContext.Provider;
export const UserConsumer = currencyContext.Consumer;

export default currencyContext;