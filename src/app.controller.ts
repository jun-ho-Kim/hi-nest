import { Controller, Get } from "../node_modules/@nestjs/common";

@Controller('')
export class AppController {
    @Get()
    home() {
        return `Welcome to my Movie API`;
    }
}