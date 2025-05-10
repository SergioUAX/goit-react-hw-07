import { useDispatch, useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { selectContacts, selectError, selectNameFilter , selectLoading } from '../../redux/selectors';
import { deleteContact } from '../../redux/contactsOps';

const ContactList = () => {
    const contactsList = useSelector(selectContacts);
    const filterValue = useSelector(selectNameFilter);
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();
    
    const handleDelete = (id) => { 
        dispatch(deleteContact(id));
    };

    const visibleContacts = contactsList.filter(contact =>
        contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );

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
