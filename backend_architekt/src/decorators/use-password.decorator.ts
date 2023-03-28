import { SetMetadata } from "@nestjs/common";

// export const usePassword = (passowrd: string) => SetMetadata('passwordProtectGoodPassword', password);
export const UsePassword = (pass: string) => SetMetadata('passwordProtectGoodPassword', pass);