exports.Validator = {
    isEmpty: (data) => {
       if(data !== undefined && typeof data === 'string' && data !== "") return true;
       else return false;
    },
    isBoolean: (data) => {
        if(data !== undefined && typeof data === 'boolean') return true;
        else return false;
     },
}