import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormField } from "../UI/FormField";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
    const LoginValidation = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),    
    });
    const SignUpMutation = useMutation({
      mutationFn: async (values:any) => {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
      onSuccess: (data) => {
        console.log("Data:", data);
      },
    })
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content w-full">
            <div className="text-center">
        {/* <h1 className="text-5xl font-bold">Login now!</h1> */}
        </div>
          <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div role="tablist" className="tabs tabs-bordered">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 1" />
  <div role="tabpanel" className="tab-content p-10">Tab content 1</div>

  <input
    type="radio"
    name="my_tabs_1"
    role="tab"
    className="tab"
    aria-label="Tab 2"
    defaultChecked />
  <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 3" />
  <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
</div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginValidation} 
                onSubmit={(values) => {
                    SignUpMutation.mutate(values);
                }}
            >
            {({ errors, touched }) => (
                <Form className="card-body">
            {/* <form className="card-body"> */}
                
                <h1 className="text-center text-black text-2xl font-bold">Login</h1>
              <div className="form-control">
               <FormField
                tooltip="Input of the email. This is required."
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
                errors={errors.email ? errors.email : ""}
                touched={touched.email ? "true" : ""}
              />
              </div>
              <div className="form-control">
                <FormField
                tooltip="Input of the password. This is required."
                name="password"
                type="password"
                placeholder="Password"
                label="Password"
                errors={errors.password ? errors.password : ""}
                touched={touched.password ? "true" : ""}
              />
                <label className="pl-4 label">
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