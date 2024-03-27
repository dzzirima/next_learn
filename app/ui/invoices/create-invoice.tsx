'use client'
import { useFormState , useFormStatus } from "react-dom";


import TextField from "@mui/material/TextField";
import { createInvoice } from "@/app/actions/invoice/action";
import { Button } from "@mui/material";
import SubmitButton from "../Utils/SubmitButton";

export default function CreateInvoiceForm() {
const initialState = {message :'' , errors:{}}


const [ state , dispatch ] = useFormState(createInvoice , initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <TextField name="customerId" size="small" variant="outlined" label="customerId" />
        {
          state.errors?.customerId && state.errors.customerId.map((error )=>(
            <p className="mt-2 text-sm text-red-500" key={error}> {error}</p>
          ))
        }
        <TextField name="status" size="small"  variant = "outlined"  className="mt-1"  label ="status"/>
        {
          state.errors?.status && state.errors.status.map((error )=>(
            <p className="mt-2 text-sm text-red-500" key={error}> {error}</p>
          ))
        }
        <TextField name="amount" size="small" className="mt-1"   variant = "outlined"  label ="amount"/>
        {
          state.errors?.amount && state.errors.amount.map((error )=>(
            <p className="mt-2 text-sm text-red-500" key={error}> {error}</p>
          ))
        }
        
        <SubmitButton label ={"Create"}/>
      </div>
    </form>
  );
}
