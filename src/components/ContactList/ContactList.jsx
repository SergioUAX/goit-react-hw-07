import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { selectError, selectLoading } from '../../redux/contactsSlice';
import { selectFilteredContacts } from '../../redux/filtersSlice';
import { deleteContact } from '../../redux/contactsOps';

const ContactList = () => {    
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const visibleContacts = useSelector(selectFilteredContacts);
    const dispatch = useDispatch();
    
    const handleDelete = (id) => { 
        dispatch(deleteContact(id));
    };

    return (        
        <div>
        <ul className={styles.contactList}  >
                {visibleContacts.map((contact) => (
                    <li key={contact.id}>
                        <Contact data={contact} onDelete={handleDelete} />
                    </li>
                ))}
        </ul>    
            { loading && <h2>Loading...</h2> }
            { error && <h2>Server is dead....</h2> }
        </div>    
    );
};

export default ContactList;
