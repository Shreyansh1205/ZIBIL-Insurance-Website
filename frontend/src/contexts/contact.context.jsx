import { createContext, useState } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <ContactContext.Provider value={{ loading, setLoading }}>
            {children}
        </ContactContext.Provider>
    );
}