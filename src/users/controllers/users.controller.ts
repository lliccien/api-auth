import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    this.usersService
      .create(createUserDto)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  }

  @Get()
  findAll(@Res() res: Response) {
    this.usersService
      .findAll()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    this.usersService
      .findOne(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    this.usersService.update(id, updateUserDto).then((result) => {
      res.status(200).json(result);
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    this.usersService
      .remove(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  }
}
