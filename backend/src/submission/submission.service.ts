import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SubmissionKeyDto } from './dto/submission-key.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission, "admin") private readonly submissionRepository: Repository<Submission>
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    return await this.submissionRepository.save(createSubmissionDto);
  }

  async findAll(): Promise<Submission[]> {
    return await this.submissionRepository.find();
  }

  async findByKey(student_id: number, question_id: number, submission_time: Date): Promise<Submission> {
    return await this.submissionRepository.findOne({
      where: {
        student_id: student_id,
        question_id: question_id,
        submission_time: submission_time
      }
    });
  }

  async update(key: SubmissionKeyDto, updateSubmissionDto: UpdateSubmissionDto): Promise<UpdateResult> {
    return await this.submissionRepository.update(key, updateSubmissionDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.submissionRepository.delete(id);
  }
}
