export class CreateQuestionDto {
    readonly description: string;
    readonly question_schema: string;
    readonly question_data: string;
    readonly answer_data: string;
    readonly max_timeout: number;
}
