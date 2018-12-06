import React from 'react';
import { render } from 'react-dom';
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

const App = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting 
  } = props;

  return (
    <div className="container">
      <Form>
        <div className="field">
          <div className="control">
            <label className="label">Full Name</label>
            {touched.fullname && errors.fullname && <p>{errors.fullname}</p>}
            <Field className="input" type="text" name="fullname" placeholder="Full Name" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Email Address</label>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field className="input" type="email" name="email" placeholder="Email" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Password</label>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field className="input" type="password" name="password" placeholder="Password" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              {touched.newsletter && errors.newsletter && <p>{errors.newsletter}</p>}
              <Field type="checkbox" name="newsletter" checked={values.newsletter} />
              Join our newsletter?
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">Pick your favorite editor</label>
          {touched.editor && errors.editor && <p>{errors.editor}</p>}
          <div className="control">
            <Field component="select" name="editor">
              <option value="atom">Atom</option>
              <option value="sublime">Sublime Text</option>
            </Field>
          </div>
        </div>

        <div className="field">
          <label className="label">Do you test your code?</label>
          {touched.test && errors.test && <p>{errors.test}</p>}
          <div className="control">
            <label class="radio">
              <input name="test" type="radio" value="yes" checked={values.thing === 'yes'} className="radio" onChange={handleChange}
              />
              Yes
            </label>
            <label className="radio">
              <input
                name="test" type="radio" value="no" checked={values.thing === 'no'} className="radio" onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>
        <button disabled={isSubmitting}>Submit</button>

        <DisplayFormikState {...props} />
      </Form>
    </div>
  )
}

const DisplayFormikState = props =>
  <div style={{ margin: '1rem 0', background: '#f6f8fa', padding: '.5rem' }}>
    <strong>Injected Formik props (the form's state)</strong>
    <div>
      <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
    </div>
    <div>
      <code>values:</code> {JSON.stringify(props.values, null, 2)}
    </div>
    <div>
      <code>isSubmitting:</code> {JSON.stringify(props.isSubmitting, null, 2)}
    </div>
  </div>;

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, editor, test }) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || false,
      editor: editor || 'atom',
      test: test || ''
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    fullname: Yup.string().required('Full Name is required!'),
    password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'yomi@gmail.io') {
        setErrors({ email: 'That email is already taken' })
      } else {
        resetForm()
      }
      setSubmitting(false)
    }, 2000)
  }
})(App)

render(<FormikApp />, document.getElementById('root'))