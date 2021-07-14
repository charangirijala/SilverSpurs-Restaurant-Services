export interface user{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    dob:string,
    orders:[{
        order_items:[],
        order_total_price:number,
    }],
    table_bookings:[
        {
            time:string,
            no_of_people:number,
            date:string,
            description:string
        }
    ]

}