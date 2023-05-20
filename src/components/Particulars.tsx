import React from "react";
import Button from "./Button";
import { Formik } from "formik";
import { SAVE_PARTICULARS } from "../hooks/firestoreHooks";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { setFirstTime, setParticularsSubmited } from "../features/app/appSlice";

export default function Particulars() {
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useDispatch();

  return (
    <div className="firstTime w-full h-full grid place-items-center absolute top-0 left-0 z-50 bg-black/20">
      <div className="firstCont bg-white shadow-xl p-10 rounded-xl">
        <h1 className=" font-bold text-[#FF4A1C] text-center text-2xl mb-2">
          Welcome to E-LogBook
        </h1>
        <p className="text-center text-black/60 text-sm w-2/3 mx-auto mb-5">
          Before you continue We need some{" "}
          <span className="text-[#FF4A1C]">information</span> about you...
        </p>
        <Formik
          initialValues={{
            courseOfStudy: "",
            registrationNumber: "",
            yearOfCourse: "",
            nameOfCompany: "",
            siwes1: "",
            siwes2: "",
            companyAddress: "",
          }}
          validate={(values) => {
            const errors: any = {};
            Object.entries(values).forEach((value) => {
              if (!value[1]) {
                errors[value[0]] = "Required";
              }
            });

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              if (user) {
                SAVE_PARTICULARS(values, user).then(() => {
                  dispatch(setFirstTime(false));
                  setSubmitting(false);
                });
              }
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className=" flex flex-col gap-3">
              <div>
                <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                  <span className="text-black font-light">Course of study</span>
                  {errors.courseOfStudy &&
                    touched.courseOfStudy &&
                    errors.courseOfStudy}
                </div>
                <input
                  name="courseOfStudy"
                  className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.courseOfStudy}
                  placeholder="Course of study"
                />
              </div>
              <div>
                <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                  <span className="text-black font-light">
                    Registration Number
                  </span>
                  {errors.registrationNumber &&
                    touched.registrationNumber &&
                    errors.registrationNumber}
                </div>
                <input
                  name="registrationNumber"
                  className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.registrationNumber}
                  placeholder="Registration Number"
                />
              </div>
              <div>
                <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                  <span className="text-black font-light">Year of Course</span>
                  {errors.yearOfCourse &&
                    touched.yearOfCourse &&
                    errors.yearOfCourse}
                </div>{" "}
                <input
                  name="yearOfCourse"
                  className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.yearOfCourse}
                  placeholder="Year of Course"
                />
              </div>
              <div>
                <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                  <span className="text-black font-light">Name of Company</span>
                  {errors.nameOfCompany &&
                    touched.nameOfCompany &&
                    errors.nameOfCompany}
                </div>
                <input
                  name="nameOfCompany"
                  className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nameOfCompany}
                  placeholder="Name of Company"
                />
              </div>
              <div className="w-full flex flex-col">
                <div>
                  <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                    <span className="text-black font-light">
                      SIWES Coordinator 1
                    </span>
                    {errors.siwes1 && touched.siwes1 && errors.siwes1}
                  </div>{" "}
                  <input
                    name="siwes1"
                    className="w-full bg-black/5 rounded-l-md mb-3 py-2 px-5 placeholder:black-/50white black-white"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.siwes1}
                    placeholder="SIWES Coordinator 1"
                  />
                </div>
                <div>
                  <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                    <span className="text-black font-light">
                      SIWES Coordinator 2
                    </span>
                    {errors.siwes2 && touched.siwes2 && errors.siwes2}
                  </div>{" "}
                  <input
                    name="siwes2"
                    className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.siwes2}
                    placeholder="SIWES Coordinator 2"
                  />
                </div>
              </div>
              <div className="sexCheck">
                <p>Sex</p>
                <div className="flex flex-row gap-2">
                  <div className="male w-7 h-7 bg text-white bg-black/20 text-center cursor-pointer hover:bg-black/50 transition-colors rounded-md grid place-items-center ">
                    <span>M</span>
                  </div>
                  <div className="female w-7 h-7 bg text-white bg-black/20 text-center cursor-pointer hover:bg-black/50 transition-colors rounded-md grid place-items-center ">
                    <span>F</span>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                  <span className="text-black font-light">Company Address</span>
                  {errors.companyAddress &&
                    touched.companyAddress &&
                    errors.companyAddress}
                </div>
                <input
                  name="companyAddress"
                  className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyAddress}
                  placeholder="Company Address"
                />
              </div>
              <div className="grid place-items-center">
                <Button
                  handleClick={() => {
                    handleSubmit();
                  }}
                  value="Submit"
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
