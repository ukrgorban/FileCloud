export const showMessage = (text, type) => {
    if(window.M && text){
        window.M.toast({html: text, classes: type});
    }
}