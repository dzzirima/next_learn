export  type Invoice  = {
    id :string;
    customerId: string;
    amount: string;
    status: 'pending'| 'paid';
    date:string
}