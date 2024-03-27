"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// zod schema defination
function delay(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string().min(1 ,"Name cant be empty !!"),
  amount: z.coerce.number().gt(0, {
    message: "amount should be greater than zero",
  }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: String[];
    amount?: String[];
    status?: String[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // const rawData = {
  //     userName: formData.get("userName"),
  //     password: formData.get("password")
  // }
  const rawDataFromEntries = Object.fromEntries(formData.entries());

  await delay( 10000)

  const validateFields = CreateInvoice.safeParse(rawDataFromEntries);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Misssing Fields . Failed to create Invoice",
    };
  }
  // prepare data to send to api
  const { customerId, amount, status } = validateFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // sent data to  backend api 

  // catch http backend specific errors
  // Insert data into the database
  try {
    await `
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }



    // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashBoard");
  redirect("/dashboard");
}
