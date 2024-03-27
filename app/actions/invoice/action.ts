
'use server'
import { z } from "zod"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"

// zod schema defination 

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount : z.coerce.number(),
    status:z.enum(['pending', 'paid']),
    date:z.string()
})

const CreateInvoice = FormSchema.omit({id: true , date : true})



export  async  function createInvoice (formData: FormData){

    // const rawData = {
    //     userName: formData.get("userName"),
    //     password: formData.get("password")
    // }
    const rawDataFromEntries = Object.fromEntries(formData.entries())

    const {customerId , amount , status } = CreateInvoice.parse(rawDataFromEntries)
    const amountInCents =  amount * 100;
    const date = new Date().toISOString().split('T')[0]

    console.log(rawDataFromEntries.amount)

    // await send to api 

    revalidatePath("/dashBoard")
    redirect("/dashBoard")
    


}