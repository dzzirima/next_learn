'use server'

export  async  function createInvoice (formData: FormData){

    const rawData = {
        userName: formData.get("userName"),
        password: formData.get("password")
    }
    const rawDataFromEntries = Object.fromEntries(formData.entries())

    console.log(rawDataFromEntries.amount)

}