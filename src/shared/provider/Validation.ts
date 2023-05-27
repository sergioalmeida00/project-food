import { AppError } from "../Errors/AppError";

export class Validation{
    static validateRequiredFields<T extends object>(obj: T, requiredFields: Record<string, string>): void {
        const missingFields = Object.keys(requiredFields).filter((field) =>  !obj[field] )
        if(missingFields.length > 0){
            const missingFieldsMessages = missingFields.map(
                (field) => requiredFields[field]
              );
              throw new AppError(`Missing required fields: ${missingFieldsMessages.join(', ')}`);
        }
    }
}