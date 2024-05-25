// All imports neededs
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Student } from 'src/students/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createResponse } from 'src/utils/response.util';
//Class, settings, injectable, all services and method neededs
@Injectable()
export class ClassesService {
  // Constructor settings repositories patterns
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }
  // Method to create class
  async create(createClassDto: CreateClassDto) {
    try {
      // To definate instance class
      const classInstance = this.classRepository.create(createClassDto);
      // Save instance created
      const savedClass = await this.classRepository.save(classInstance);
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.CREATED, 1, 'Class created successfully', savedClass);
    } catch (error) {
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error creating class'));
    }
  }
  // Method to findAll class
  async findAll() {
    try {
      // To definate instance class
      const classInstance = await this.classRepository.find();
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Classes retrieved successfully', classInstance);
    } catch (error) {
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error retrieving class'));
    }
  }
  // Method to findOne class
  async findOne(id_class: number) {
    try {
      // To definate instance class
      const classInstance = await this.classRepository.findOneBy({ id_class });
      // to validate if class existing in DB
      if (!classInstance) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Class with id ${id_class} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Class retrieved successfully', classInstance);
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 1, 'Error retrieving class'));
    }
  }
  // Method to update class
  async update(id_class: number, updateClassDto: UpdateClassDto) {
    try {
      // To definate instance class findOne
      const updatedClass = await this.classRepository.findOneBy({ id_class });
      // if updatedClass == null, to means id non-existing in DB or deleted
      if (updatedClass == null) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Class with id ${id_class} deleted`));
      }
      // Call method ipdate TypeORM
      const result = await this.classRepository.update(id_class, updateClassDto);
      // if affected === 0, to means id non-existing in DB
      if (result.affected === 0) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Class with id ${id_class} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Class updated successfully', updatedClass);
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 1, 'Error updating class'));
    }
  }
  // Method to delete class
  async remove(id_class: number) {
    try {
      // Call method ipdate TypeORM
      const result = await this.classRepository.softDelete({ id_class });
      // if affected === 0, to means id non-existing in DB
      if (result.affected === 0) {
        // to create throw exception error with statusCode Not Found and return JSON RES.
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Class with id ${id_class} not found`));
      }
      //Return and call to method createdResponse, to setting JSON RESPONSE personalized.
      return createResponse(HttpStatus.OK, 1, 'Class deleted successfully');
    } catch (error) {
      // to validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // to created throw exception error with statusCode internar server error.
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 1, 'Error deleting class'));
    }
  }
  /* =============================================================================================================================
                                                        Extra Methods 
  ================================================================================================================================*/
  // Method to create class
  async addTeacher(id_class: number, body: any) {
    try {
      // Accessing the attributes of the DTO
      const { fk_id_teacher_class } = body;
      // Find the class instance
      const classInstance = await this.classRepository.findOne({
        where: { id_class },
        relations: ['fk_id_teacher_class'],
      });
      // Validate if class exists in DB
      if (!classInstance) {
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Class with id ${id_class} not found`));
      }
      // Validate if class already has a teacher
      if (classInstance.fk_id_teacher_class) {
        throw new BadRequestException(createResponse(HttpStatus.BAD_REQUEST, 400, `Class with id ${id_class} already has a teacher.`));
      }
      // Find the teacher instance
      const teacherInstance = await this.teacherRepository.findOneBy({ id_teacher: fk_id_teacher_class });
      if (!teacherInstance) {
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Teacher with id ${fk_id_teacher_class} not found`));
      }
      // Assign the teacher to the class
      classInstance.fk_id_teacher_class = teacherInstance;
      await this.classRepository.save(classInstance);
      // Return a successful response
      return createResponse(HttpStatus.OK, 1, 'Teacher assigned to class successfully', classInstance);
    } catch (error) {
      // Handle errors and throw an internal server error if necessary
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error assigning teacher to class', error.message));
    }
  }
  // Method to create class
  async addStudents(id_class: number, body: any) {
    try {
      // Accessing the attributes of the DTO
      const { student_ids } = body;
      // Find the class instance
      const classInstance = await this.classRepository.findOne({
        where: { id_class },
        relations: ['students'],
      });
      // Validate if class exists in DB
      if (!classInstance) {
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Class with id ${id_class} not found`));
      }
      // Find all student instances
      const students = await this.studentRepository.findByIds(student_ids);
      // Validate if all students exist in DB
      if (students.length !== student_ids.length) {
        throw new BadRequestException(createResponse(HttpStatus.BAD_REQUEST, 400, `Some students not found`));
      }
      // Add students to the class
      classInstance.students = [...classInstance.students, ...students];
      await this.classRepository.save(classInstance);
      // Return a successful response
      return createResponse(HttpStatus.OK, 1, 'Students added to class successfully', classInstance);
    } catch (error) {
      // Handle errors and throw an internal server error if necessary
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 0, 'Error adding students to class', error.message));
    }
  }
  // Method to get all students by class
  async getStudentsByClass(id_class: number) {
    try {
      // Find the class instance along with the students
      const classInstance = await this.classRepository.findOne({
        where: { id_class },
        relations: ['students'],
      });
      // Validate if class exists in the DB
      if (!classInstance) {
        throw new NotFoundException(createResponse(HttpStatus.NOT_FOUND, 404, `Class with id ${id_class} not found`));
      }
      // Return the students of the class
      return createResponse(HttpStatus.OK, 1, 'Students retrieved successfully', classInstance.students);
    } catch (error) {
      // Validate if NotFoundException error or not
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Create throw exception error with status code internal server error
      throw new InternalServerErrorException(createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 1, 'Error retrieving students'));
    }
  }
}
