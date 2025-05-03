export const showError = (condition: any, errorName: string): void => {
  if(condition){
    const error = new Error()
    error.name = errorName
    throw error
  }
}