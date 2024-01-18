import { Field, Formik } from "formik";
import { SAVE_PARTICULARS, useFireHook } from "../hooks/firestoreHooks";

import Button from "./Button";
import { ParticularsInterface } from "../interface/particulars";
import React from "react";
import { setParticulars } from "../features/particulars/particularsSlice";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";

type InputWithSuggestionsProps = React.InputHTMLAttributes<HTMLInputElement> & {
  sugs: any[];
  sense?: string;
  sfv: (f: string, v: string) => void
}

const InputWithSuggestions = (props: InputWithSuggestionsProps) => {
  const [s, setS] = React.useState(false);
  const [v, setV] = React.useState<string>();
  const handleChange = (x: any[]) => {
    console.log({ x })
    setV(x[1].name)
    setS(false)
    props.name && props.sfv(props.name, x[0]);
  }
  return (
    <div tabIndex={0} onFocus={() => { setS(true) }} onClick={() => { !s && setS(true) }} onBlur={(e: any) => { setS(false) }} className={`w-full relative cursor-pointer`}>
      <div className={`w-full bg-black/5 rounded-sm mb-3 py-2 px-5 ${v ? "" : "text-black/50"} ${!s ? "" : " outline-[#FF4A1C] outline outline-2 "}`}>{v ? v : props.placeholder}</div>
      {s ?
        <div className="z-10 shadow-xl cursor-default rounded-lg absolute bg-white border-2  border-[#FF4A1C] w-full p-2 max-h-30">
          <ul className="overflow-y-scroll flex flex-col gap-2 ">
            {props.sugs.map((x: any, i) => (
              <li
                onClick={() => { if (props.sense !== x[0]) { handleChange(x) } }}
                key={i}
                className={`${props.sense === x[0] ? "line-through	" : ""} cursor-pointer flex justify-between uppercase text-black/50 bg-black/5 p-2 text-xs hover:bg-[#FF4A1C] hover:text-white`}>
                <span>{x[1].name}</span>
                <span>{x[1].lId}</span>
              </li>
            ))}
          </ul>
        </div> : null
      }
    </div>
  )
}

export default function Particulars() {
  const { sups, setSupee } = useFireHook()
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const [sex, setSex] = React.useState("");
  const [Done, setDone] = React.useState(false);
  const formFields: ParticularsInterface = {
    courseOfStudy: "",
    registrationNumber: "",
    yearOfCourse: "",
    nameOfCompany: "",
    siwes1: "",
    siwes2: "",
    companyAddress: "",
    sex: "",
    startDate: "",
  };

  if (Done || !sups) {
    return null;
  } else {
    // console.log(sups)
  }


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
          initialValues={formFields}
          validate={(values) => {
            const errors: any = {};
            Object.entries(values).forEach((value) => {
              if (!value[1] && value[0] !== "startDate") {
                errors[value[0]] = "Required";
              }
            });
            console.log({ errors })
            return (errors);
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              if (user) {

                SAVE_PARTICULARS(values, user).then(() => {
                  // dispatch(setParticularsSubmited(true))
                  values && dispatch(setParticulars(values));
                  setSubmitting(false);
                  setDone(true);
                  user.displayName && setSupee(user.uid, user.displayName, values.siwes1, true)
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
            setFieldValue,
            /* and other goodies */
          }) => (
            <form className=" flex flex-col gap-3">
              <div>
                <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                  <span className="text-black font-light">
                    Internship Start Date
                  </span>
                </div>
                <Field
                  name="startDate"

                  className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.startDate}
                  placeholder="Start Date"
                />
              </div>
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
                  <InputWithSuggestions
                    sfv={setFieldValue}
                    sugs={Object.entries(sups as typeof Object)}
                    name="siwes1"
                    className="w-full bg-black/5 rounded-l-md mb-3 py-2 px-5 placeholder:black-/50white black-white"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.siwes1}
                    placeholder="SIWES Coordinator 1"
                    sense={values.siwes2}
                  />
                </div>
                <div>
                  <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                    <span className="text-black font-light">
                      SIWES Coordinator 2
                    </span>
                    {errors.siwes2 && touched.siwes2 && errors.siwes2}
                  </div>{" "}
                  <InputWithSuggestions
                    sfv={setFieldValue}
                    sugs={Object.entries(sups as typeof Object)}
                    name="siwes2"
                    className="w-full bg-black/5 rounded-l-md py-2 px-5 placeholder:text-black/50 text-black"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.siwes2}
                    placeholder="SIWES Coordinator 2"
                    sense={values.siwes1}
                  />
                </div>
              </div>
              <div className="sexCheck">
                <div className=" text-red-400 font-bold text-sm flex flex-row gap-1">
                  <span className="text-black font-light">Sex</span>
                  {errors.sex && errors.sex}
                </div>
                <div className="flex flex-row gap-2" onBlur={(e) => { console.log(e) }}>
                  <div
                    onClick={() => {
                      setSex("male");
                      setFieldValue("sex", "male");
                    }}
                    className={`male w-7 h-7 bg font-bold text-center cursor-pointer  transition-colors rounded-md grid place-items-center ${sex === "male"
                      ? "bg-[#FF4A1C] text-white"
                      : "bg-black/5 text-black/50 hover:bg-black/20"
                      }`}
                  >
                    <span>M</span>
                  </div>
                  <div
                    onClick={() => {
                      setSex("female");
                      setFieldValue("sex", "female");
                    }}
                    className={`male w-7 h-7 font-bold text-center cursor-pointer  transition-colors rounded-md grid place-items-center ${sex === "female"
                      ? "bg-[#FF4A1C] text-white"
                      : "bg-black/5 text-black/50 hover:bg-black/20 "
                      }`}
                  >
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
                <div onClick={() => { setDone(true) }} className=" cursor-pointer">
                  <b>skip</b>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
