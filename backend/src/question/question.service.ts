import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Question } from './entities/question.entity';
import { AdminService } from 'src/admin.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectDataSource('admin') private readonly dataSource: DataSource,
    @InjectDataSource('participant') private readonly participantDataSource: DataSource,
    @InjectRepository(Question, 'admin')
    private readonly questionRepository: Repository<Question>,
  ) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { name, question_schema, question_data } = createQuestionDto;
    const queryRunner = this.dataSource.createQueryRunner();

    let question;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.query(`CREATE SCHEMA ${name}`);
      await queryRunner.query(`ALTER DEFAULT PRIVILEGES FOR ROLE ${process.env.ADMIN_USERNAME} IN SCHEMA ${name} GRANT SELECT ON TABLES TO ${process.env.PARTICIPANT_USERNAME}`);
      await queryRunner.query(`SET LOCAL SEARCH_PATH = ${name}`);
      await queryRunner.query(question_schema);
      await queryRunner.query(question_data);
      await queryRunner.query('SET LOCAL SEARCH_PATH = public');
      question = await this.questionRepository.save(createQuestionDto);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return question;
  }


  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async getList(page: number, limit: number): Promise<Question[]> {
    return await this.questionRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findByKey(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<UpdateResult> {
    return await this.questionRepository.update(id, updateQuestionDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.questionRepository.delete(id);
  }

  async getQuestionCount(): Promise<number> {
    return await this.questionRepository.count();
  }
}
