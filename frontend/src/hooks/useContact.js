import { useContext } from 'react'
import { ContactContext } from '../contexts/contact.context'
import { createContact } from '../services/contact.api'

export const useContact = () => {
    const context = useContext(ContactContext)
    const { loading, setLoading } = context;

    const handleContactSave = async ({ name, email, phoneNo, message }) => {
        setLoading(true);
        try {
            const response = await createContact({ name, email, phoneNo, message });
            return { success: true, data: response };
        } catch (error) {
            return { success: false, errors: error };
        } finally {
            setLoading(false);
        }
    }
    return { loading, setLoading, handleContactSave };
}