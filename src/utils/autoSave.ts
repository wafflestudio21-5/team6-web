const AUTOSAVE_TAG="COMMENT_AUTO_SAVE_"

function tag(userId:number,type:"comment"|"reply"|"edit",id:string|number){return `tag${userId}${type[0]}${id}`;}

async function set(userId:number,type:"comment"|"reply"|"edit",id:string|number,val:string){
    localStorage.setItem(AUTOSAVE_TAG+tag(userId,type,id),val);
}

function get(userId:number,type:"comment"|"reply"|"edit",id:string|number){
    return localStorage.getItem(AUTOSAVE_TAG+tag(userId,type,id));
}

async function remove(userId:number,type:"comment"|"reply"|"edit",id:string|number){
    localStorage.removeItem(AUTOSAVE_TAG+tag(userId,type,id));
}

const autoSave = {set, get, remove};

export default autoSave