// All imports neededs
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { createResponse } from '../utils/response.util';
//Class, settings, injectable, all services and method neededs
@Injectable()
export class StudentsService {
  // Constructor settings repositories patterns
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) { }
  // Method to create student
  async create(createStudentDto: CreateStudentDto) {
    try {
      // To definate instance student
      const student = this.studentRepository.create(createStudentDto);
      // Save instance created
      const savedStudent = await this.studentRepository.save(student);
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.CREATED, 1, 'Student created successfully', savedStudent);
    } catch (error) {
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error creating student'));
    }
  }
  // Method to findAll teacher
  async findAll() {
    try {
      // To definate instance teacher
      const students = await this.studentRepository.find();
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Students retrieved successfully', students);
    } catch (error) {
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error retrieving students'));
    }
  }
  // Method to findOne student
  async findOne(id_student: number) {
    try {
      // To definate instance student
      const student = await this.studentRepository.findOneBy({ id_student });
      // to validate if student existing in DB
      if (!student) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Student with id ${id_student} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Student retrieved successfully', student);
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error retrieving student'));
    }
  }
  // Method to update studente
  async update(id_student: number, updateStudentDto: UpdateStudentDto) {
    try {
      // To definate instance studente findOne
      const updatedStudent = await this.studentRepository.findOneBy({ id_student });
      // if updatedStudent == null, to means id non-existing in DB or deleted
      if (updatedStudent == null) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Student with id ${id_student} deleted`));
      }
      // Call method ipdate TypeORM
      const result = await this.studentRepository.update(id_student, updateStudentDto);
      // if affected === 0, to means id non-existing in DB
      if (result.affected === 0) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Student with id ${id_student} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Studente updated successfully', updatedStudent);
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error updating studente'));
    }
  }
  // Method to delete student
  async remove(id_student: number) {
    try {
      // Call method ipdate TypeORM
      const result = await this.studentRepository.softDelete({ id_student });
      // if affected === 0, to means id non-existing in DB
      if (result.affected === 0) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Student with id ${id_student} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'student deleted successfully');
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error deleting student'));
    }
  }
}
