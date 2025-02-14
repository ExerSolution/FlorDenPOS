import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
    const LoginValidation = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),    
    });
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
            <div className="text-center">
        <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginValidation} 
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
            {({ errors, touched }) => (
                <Form className="card-body">
            {/* <form className="card-body"> */}
                
                <h1 className="text-center text-black text-2xl font-bold">Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            {/* </form> */}
            </Form>
            )}
            </Formik>
          </div>
        </div>
      </div>
    );
}