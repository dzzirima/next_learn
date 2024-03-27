import TextField from "@mui/material/TextField";
import { createInvoice } from "@/app/actions/invoice/action";
import { Button } from "@mui/material";

export default function CreateInvoiceForm() {
  return (
    <form action={createInvoice}>
      <div className="flex flex-col justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <TextField name="customer" size="small" variant="outlined" label="customerId" />
        <TextField name="status" size="small"  variant = "outlined"  className="mt-1"  label ="status"/>
        <TextField name="amount" size="small" className="mt-1"   variant = "outlined"  label ="amount"/>
        <Button type="submit"> Submit</Button>
      </div>
    </form>
  );
}
