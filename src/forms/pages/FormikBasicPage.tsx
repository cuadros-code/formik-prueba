import { FormikErrors, useFormik } from 'formik';
import '../styles/styles.css';
interface IFormikValues {
  firstName: string;
  lastName: string;
  email: string;
}
const FormikBasicPage = () => {

  const validate = ( values: IFormikValues ) => {
    const errors: FormikErrors<IFormikValues> = {};
    if (!values.firstName)  errors.firstName = 'Required';
    if (!values.lastName)  errors.lastName = 'Required';
    if (!values.email) {
      errors.email = 'Required';
    } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  }

  const { handleChange, values, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      console.log(values);
    },
    validate: values => validate(values)
  })


  return (
    <div>
      <h1>Formik Basic</h1>

      <form noValidate onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor="firstName">First Name</label>
        <input 
          type="text" 
          name="firstName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
        />
        { errors.firstName && touched.firstName && <span>{ errors.firstName }</span> }

        <label htmlFor="lastName">Last Name</label>
        <input 
          type="text" 
          onBlur={handleBlur}
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
        />
        { errors.lastName && touched.lastName && <span>{ errors.lastName }</span> }

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          onBlur={handleBlur}
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        { errors.email && touched.email &&  <span>{ errors.email }</span> }

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default FormikBasicPage;
