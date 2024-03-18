
export type Operation = 'multiply' | 'add' | 'divide';


export const calculator = (a : number, b :  number, op : Operation) : number => {
  switch(op){
    case  'multiply' : 
        return a * b ;
    case 'add' :
        return a + b;
    case 'divide' :
        if(b === 0) throw new Error('Can not divide by 0');
        return a / b;
    default :
        throw new Error('Operation is not either Multipy, Add or Divide !');
  }
};

try {
    console.log(calculator(10,5,'add'));
} catch (error : unknown) {
    let errorMessage = 'Something went wrong : ';
    if( error instanceof Error){
        errorMessage += error.message;
    }
    console.log(errorMessage);
}