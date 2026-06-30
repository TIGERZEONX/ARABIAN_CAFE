import styles from "./SettingsForm.module.css";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function SettingsForm() {

return (

<div className={styles.card}>

<Input
label="Cafe Name"
/>

<Input
label="Email"
/>

<Button
label="Save"
/>

</div>

);

}