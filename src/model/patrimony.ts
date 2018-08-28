export class Patrimony {
    id: String; 
    name: String; 
    description: String; 
    tagId: String; 
    
    constructor(id?:String ,name?:String ,description?: String, tagId?:String){
        this.id = id; 
        this.name = name; 
        this.description = description; 
        this.tagId = tagId; 
    }

}
