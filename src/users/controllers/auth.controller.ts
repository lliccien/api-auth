import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Public } from '../decorators/public.decorator';
import { Token } from '../class/token';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({
    status: 201,
    description: 'Sign Up User',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @Public()
  @Post('singup')
  signUp(@Body() user: CreateUserDto, @Res() res: Response) {
    this.authService
      .signUp(user)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  }

  @ApiOperation({ summary: 'SignIn' })
  @ApiResponse({
    status: 200,
    description: 'Sign In User',
    type: Token,
  })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @Public()
  @Post('signin')
  signIn(@Body() user: CreateUserDto, @Res() res: Response) {
    this.authService
      .signIn(user)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  }
}
