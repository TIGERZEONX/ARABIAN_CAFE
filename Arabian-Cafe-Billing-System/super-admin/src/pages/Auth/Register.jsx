import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthTemplate from "@/components/templates/AuthTemplate";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

import axios from "axios";

import styles from "./Register.module.css";

export default function Register() {

const navigate =
useNavigate();

const [form, setForm] =
useState({
fullName:"",
email:"",
password:"",
});

const handleChange=
(field)=>
(e)=>{

setForm({

...form,

[field]:
e.target.value,

});

};

const submit=
async(e)=>{

e.preventDefault();

try{

await axios.post(
"http://localhost:5000/api/auth/register",
form
);

alert(
"Account Created"
);

navigate(
"/login"
);

}

catch(err){

alert(
err.response?.data?.message
||
"Registration Failed"
);

}

};

return(

<AuthTemplate>

<div className={styles.box}>

<h1>
Create Account
</h1>

<form
onSubmit={submit}
>

<Input
label="Full Name"
value={
form.fullName
}
onChange={
handleChange(
"fullName"
)
}
/>

<Input
label="Email"
value={form.email}
onChange={
handleChange(
"email"
)
}
/>

<Input
label="Password"
type="password"
value={form.password}
onChange={
handleChange(
"password"
)
}
/>

<Button
type="submit"
label="Create Account"
/>

</form>

</div>

</AuthTemplate>

);

}