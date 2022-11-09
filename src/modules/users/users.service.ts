import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from './models/user';
import CreateUserDTO from './dto/create-user.dto';
import UpdatePasswordDTO from './dto/update-password.dto';
import UpdateUserDTO from './dto/update-user.dto';

@Injectable()
export class UsersService {
  public static EMAIL_IN_USE = new BadRequestException(
    'EMAIL_IN_USE',
    'This email is already in use.',
  );
  public static USER_NOT_FOUND = new NotFoundException(
    'USER_NOT_FOUND',
    "The user with this ID didn't exist.",
  );
  public static WRONG_PASSWORD = new UnauthorizedException(
    'WRONG_PASSWORD',
    'Incorrect old password.',
  );

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public getByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).exec();
  }

  public getByID(id: string): Promise<User | undefined> {
    if (!isValidObjectId(id)) {
      return null;
    }
    return this.userModel.findOne({ _id: id }).exec();
  }

  public async create(payload: CreateUserDTO): Promise<User> {
    if (await this.getByEmail(payload.email)) {
      throw UsersService.EMAIL_IN_USE;
    }

    const user = new this.userModel(payload);
    await user.save();
    return user;
  }

  public async update(
    userID: string,
    payload: UpdateUserDTO,
  ): Promise<boolean> {
    if (payload.email && (await this.getByEmail(payload.email))) {
      throw UsersService.EMAIL_IN_USE;
    }

    await this.userModel.findByIdAndUpdate(userID, payload);
    return true;
  }

  public async updatePassword(
    userID: string,
    payload: UpdatePasswordDTO,
  ): Promise<boolean> {
    const user = await this.getByID(userID);
    const { oldPassword, newPassword } = payload;

    if (!user) {
      throw UsersService.USER_NOT_FOUND;
    }

    const match = await user.comparePassword(oldPassword);
    if (match !== true) {
      throw UsersService.WRONG_PASSWORD;
    }

    user.password = newPassword;
    await (user as UserDocument).save();
    return true;
  }
}
