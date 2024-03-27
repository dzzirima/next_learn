import TextField from "@mui/material/TextField";

export default function CreateInvoiceForm() {
  return (
    <form>
        <div className="flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
        <TextField name="name"  size="small"/>
        <TextField name="name"  size="small" className="mt-1"/>
        </div>
   
    </form>
  );
}
