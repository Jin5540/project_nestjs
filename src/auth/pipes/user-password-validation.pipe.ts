import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class UserPasswordValidation implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
}