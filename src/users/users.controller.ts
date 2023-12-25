import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  //NOTE : always define static routes before dynamic routes
  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    return [];
  }
  //The :id is a parameter of a route.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }
  @Post()
  create(@Body() user: any) {
    return user;
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: any) {
    return `This action updates a #${id} user with ${JSON.stringify(
      userUpdate,
    )}`;
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
