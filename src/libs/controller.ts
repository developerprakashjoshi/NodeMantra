
export default class Controller{
    constructor(){
       console.log("Hello") 
    }
    static response(res:any, message:any) {
        return res.status(200).json({ success: true, message })
    }
}