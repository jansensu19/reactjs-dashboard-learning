import { initialProducts } from '../data/mockData'

export const fetchProductsData = (errorTest = false) => {
  return new Promise ((resolve, reject) =>{
    setTimeout(() => {
        const simulateError = errorTest;

        if (simulateError){
            reject(new Error("Failed to connect to the analytics server."));
        } else {
            resolve({
                products: [...initialProducts],
            });
        }
    }, 1000);
  })
}
