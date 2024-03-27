
'use server'
import { z } from "zod"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"

// zod schema defination 

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error:"Please enter  customer name"
    }),
    amount : z.coerce.number().gt(0, {
        message:"amount should be greater than zero"
    }),
    status:z.enum(['pending', 'paid'],{
        invalid_type_error:"Please select an invoice status"
    }),
    date:z.string()
})

const CreateInvoice = FormSchema.omit({id: true , date : true})


export type State = {
    errors?:{
        customerId?: String[];
        amount?:String[];
        status?:String[];
    };
    message?:string | null
}



export  async  function createInvoice (prevState:State, formData: FormData){

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

    // safe parse 

    const validateFields =  CreateInvoice.safeParse(rawDataFromEntries);

    if(!validateFields.success){
        return {
            errors:validateFields.error.flatten().fieldErrors,
            message:'Misssing Fields . Failed to create Invoice'
        }
    }
   

    revalidatePath("/dashBoard")
    redirect("/dashboard")


    
    


}