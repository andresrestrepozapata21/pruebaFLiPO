// All imports neededs
import { Injectable, NotFoundException, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { createResponse } from '../utils/response.util';
//Class, settings, injectable, all services and method neededs
@Injectable()
export class TeachersService {
  // Constructor settings repositories patterns
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>
  ) { }
  // Method to create teacher
  async create(createTeacherDto: CreateTeacherDto) {
    try {
      // To definate instance teacher
      const teacher = this.teacherRepository.create(createTeacherDto);
      // Save instance created
      const savedTeacher = await this.teacherRepository.save(teacher);
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.CREATED, 1, 'Teacher created successfully', savedTeacher);
    } catch (error) {
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error creating teacher'));
    }
  }
  // Method to findAll teacher
  async findAll() {
    try {
      // To definate instance teacher
      const teachers = await this.teacherRepository.find();
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Teachers retrieved successfully', teachers);
    } catch (error) {
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error retrieving teachers'));
    }
  }
  // Method to findOne teacher
  async findOne(id_teacher: number) {
    try {
      // To definate instance teacher
      const teacher = await this.teacherRepository.findOneBy({ id_teacher });
      // to validate if teacher existing in DB
      if (!teacher) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Teacher with id ${id_teacher} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Teacher retrieved successfully', teacher);
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 1, 'Error retrieving teacher'));
    }
  }
  // Method to update teacher
  async update(id_teacher: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      // To definate instance teacher findOne
      const updatedTeacher = await this.teacherRepository.findOneBy({ id_teacher });
      // if updatedTeacher == null, to means id non-existing in DB or deleted
      if (updatedTeacher == null) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Teacher with id ${id_teacher} deleted`));
      }
      // Call method ipdate TypeORM
      const result = await this.teacherRepository.update(id_teacher, updateTeacherDto);
      // if affected === 0, to means id non-existing in DB
      if (result.affected === 0) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Teacher with id ${id_teacher} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Teacher updated successfully', updatedTeacher);
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 1, 'Error updating teacher'));
    }
  }
  // Method to delete teacher
  async remove(id_teacher: number) {
    try {
      // Call method ipdate TypeORM
      const result = await this.teacherRepository.softDelete({ id_teacher });
      // if affected === 0, to means id non-existing in DB
      if (result.affected === 0) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Teacher with id ${id_teacher} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Teacher deleted successfully');
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 1, 'Error deleting teacher'));
    }
  }
}
