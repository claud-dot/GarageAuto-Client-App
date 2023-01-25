export interface Repair {
    user_car:{
        user_id:string,
        mark:string,
        model:string
    },
    comment:string,
    advancement:number,
    status:number,
    create_at:Date,
    update_at:Date
}
