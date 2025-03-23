import { HttpError } from '../../errors/HttpError';
import { TContact } from './contact.interface';
import { Contact } from './contact.model';

const createContact = async (payload: TContact) => {
    const createdContact = await Contact.create(payload);
    return createdContact;
};

const getAllContacts = async () => {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
        throw new HttpError(404, 'No contacts were found in the database');
    }

    return contacts;
};

const getContactById = async (id: string) => {
    const contact = await Contact.findById(id);

    if (!contact) {
        throw new HttpError(404, 'The requested contact could not be found.');
    }

    return contact;
};

const deleteContactById = async (id: string) => {
    const deletedContact = await Contact.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
    );
    if (!deletedContact) {
        throw new HttpError(404, 'The requested contact could not be found.');
    }

    return deletedContact;
};

export const ContactServices = {
    createContact,
    getAllContacts,
    getContactById,
    deleteContactById,
};