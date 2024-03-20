export class UpdateSubmissionDto {
    readonly student_id: number;
    readonly question_id: number;
    readonly submission_time: Date;
    readonly is_correct: boolean;
    readonly planning_time: number;
    readonly execution_time: number;
    readonly query: string;
    readonly status: string;
}
