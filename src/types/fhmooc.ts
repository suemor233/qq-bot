export interface StuPaperQuesType {
  code: number;
  stuPaperQuesList: StuPaperQuesList[];
  paperId: string;
  paperName: string;
  paperStuId: string;
  finalTime: string;
  dateNow: string;
}

interface StuPaperQuesList {
  quesId: string;
  quesType: number;
  submitState: number;
  isStamp: number;
}