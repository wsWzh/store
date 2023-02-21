export function debug(...args){
    try{
        const {pathname}=location
        if(/^\/debug\//.test(pathname)){
            console.warn(...args);
        }
    }catch(err){

    }
}