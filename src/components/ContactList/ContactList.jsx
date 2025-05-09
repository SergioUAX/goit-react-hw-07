import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { deleteContact } from '../../redux/contactsSlice';

const ContactList = () => {
    const contactsList = useSelector((state) => state.contacts.items);
    const filterValue = useSelector((state) => state.filters.name);
    const dispatch = useDispatch();
    
    const handleDelete = (id) => { 
        dispatch(deleteContact(id));
    };

    const visibleContacts = contactsList.filter(contact =>
        contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );

    return (        
            <ul className={styles.contactList}  >
                {visibleContacts.map((contact) => (
                    <li key={contact.id}>
                        <Contact data={contact} onDelete={handleDelete} />
                    </li>
                ))}
            </ul>        
    );
};

export default ContactList;
