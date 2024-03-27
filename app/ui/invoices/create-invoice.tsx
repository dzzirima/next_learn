'use client'
import { useFormState } from "react-dom";


import TextField from "@mui/material/TextField";
import { createInvoice } from "@/app/actions/invoice/action";
import { Button } from "@mui/material";

export default function CreateInvoiceForm() {
const initialState = {message :null , errors:{}}

const [ state , dispatch ] = useFormState(createInvoice , initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <TextField name="customerId" size="small" variant="outlined" label="customerId" />
        <TextField name="status" size="small"  variant = "outlined"  className="mt-1"  label ="status"/>
        <TextField name="amount" size="small" className="mt-1"   variant = "outlined"  label ="amount"/>
        <Button type="submit"> Submit</Button>
      </div>
    </form>
  );
}
