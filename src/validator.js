const validator = {
    //creacion isvalid
  isvalid: (creditCardNumber) => {
    let numeros = (creditCardNumber.split("").reverse())
    let par = 0,
        impar = 0;
        for(let i=0; i<numeros.length; i++){
          if(i%2===1){
            let num=(numeros[i]*2);
            if(num>=10){
              num=(num-10)+1;
            }
            par+=num;
          }
          else{
            impar+=Number(numeros[i]);
          }
        }
      let result = (par+impar);
      return result % 10 === 0 ? true : false;
  },
    //creacion maskify
  maskify: (creditCardNumber) => {
    let mascarado = creditCardNumber.length;
    let final = "";
    for(let i = 0; i< mascarado - 4;i++){
        final += "#";
    }
    return final + creditCardNumber.substring(mascarado-4,mascarado);
  }
};

export default validator;
