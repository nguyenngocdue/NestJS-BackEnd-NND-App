import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService
  ) {}

  @Get() /// => api (restful api)
  @Render("home")
  handleHomePage() {
    //port from .env
    const message = this.appService.getHello();
    return {
      message: message
    }
  }
}
