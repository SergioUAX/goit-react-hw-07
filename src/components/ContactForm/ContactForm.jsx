import styles from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

const initialValues = {
  name: '',
  number: '',
};

const addContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    number: Yup.string()
        .matches(/^\+?(\d+(-\d+)*|\d+)$/, 'Only digits, "-" and optional leading "+" allowed')
        .test(
            'valid-digits-count',
            'Number must contain at least 3 digits',
            value => {
                if (!value) return false;
                const digitsCount = (value.match(/\d/g) || []).length;
                return digitsCount >= 3;
            }
        )
        .max(50, 'Number must be at most 50 characters long')
        .required('Required'),
});

const ContactForm = () => {
    const dispatch = useDispatch();
    const nameId = nanoid();
    const numberId = nanoid();

    const handleSubmit = (values, actions) => {        
        const newContact = {
            id: nanoid(),
            name: values.name,
            number: values.number,
        };
        dispatch(addContact(newContact));
        actions.resetForm();
    };

    return (
        <Formik            
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={addContactSchema}>
            <Form className={styles.formikForm}>
                <div>
                    <label htmlFor={nameId}>Name</label>
                    <Field type="text" name="name" id={nameId} />
                    <ErrorMessage name="name" component="span" />
                </div>
                <div>
                    <label htmlFor={numberId}>Number</label>
                    <Field type="text" name="number" id={numberId} />
                    <ErrorMessage name="number" component="span" />
                </div>
                <button type="submit">Add contact</button>
            </Form>
        </Formik>
    );
};

export default ContactForm;
