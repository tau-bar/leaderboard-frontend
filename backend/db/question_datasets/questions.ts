import { QuestionDto } from "src/question/dto/question.dto";
import * as fs from 'fs';
import { carpriceData, carpriceSchema } from "./carprices";
import { leTourData, leTourSchema } from "./letour";
import { mondialSchema, mondialData } from "./mondial";
import { tpccSchema, tpccData } from "./tpcc";

function convertCsvToText(csvFilePath: string): string {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = csvData.split('\n');
    const textData = rows.map(row => row.trim()).join('\n');

    return textData;
}

const questions: QuestionDto[] = [
    {
        id: 1,
        description: `The Tour de France is an annual professional road cycling competition held primarily in France, with occasional routes passing through neighbouring countries. Find the average speed in kilometre per hour of each rider.`,
        question_schema: leTourSchema,
        question_data: leTourData,
        answer_data: convertCsvToText("../question_results/q1_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 2,
        description: `The Tour de France is an annual professional road cycling competition held primarily in France, with occasional routes passing through neighbouring countries. On what days were all teams represented in the top 50 stage rankings?`,
        question_schema: leTourSchema,
        question_data: leTourData,
        answer_data: convertCsvToText("../question_results/q2_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 3,
        description: `The Tour de France is an annual professional road cycling competition held primarily in France, with occasional routes passing through neighbouring countries. For each stage, list the number of mountains in Category 3. If a stage does not have such a mountain, the result should list 0 for this stage. Return the result ordered in increasing stage number and decreasing number of mountains of Category 3.`,
        question_schema: leTourSchema,
        question_data: leTourData,
        answer_data: convertCsvToText("../question_results/q3_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 4,
        description: `The MONDIAL Database is a database of geographic and demographic data created in 1998 at Freiburg University and maintained at G¨ottingen University since 2002. Rank the population of each country by continent and globally, listing them in descending order.`,
        question_schema: mondialSchema,
        question_data: mondialData,
        answer_data: convertCsvToText("../question_results/q4_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 5,
        description: `The TPC-C dataset is a database schema designed to simulate a wholesale supplier's operations. It includes information about warehouses, items, and stocks of items at each warehouse. Retrieve items for which there exists at least one warehouse that has that item in stock.`,
        question_schema: tpccSchema,
        question_data: tpccData,
        answer_data: convertCsvToText("../question_results/q5_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 6,
        description: `The Car Sales dataset provides comprehensive information about car sales, including details about the cars themselves (such as make, model, year, and condition) and information about the sales transactions (such as selling price and seller). Retrieve the top 3 most popular car models (based on total sales) for each state`,
        question_schema: carpriceSchema,
        question_data: carpriceData,
        answer_data: convertCsvToText("../question_results/q6_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 7,
        description: `The Car Sales dataset provides comprehensive information about car sales, including details about the cars themselves (such as make, model, year, and condition) and information about the sales transactions (such as selling price and seller). Select all vehicle numbers (vin) sold by the seller which made the most sales`,
        question_schema: carpriceSchema,
        question_data: carpriceData,
        answer_data: convertCsvToText("../question_results/q7_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 8,
        description: `The TPC-C dataset is a database schema designed to simulate a wholesale supplier's operations. It includes information about warehouses, items, and stocks of items at each warehouse. Find the id of items that are available in stock in warehouses located in Singapore.`,
        question_schema: tpccSchema,
        question_data: tpccData,
        answer_data: convertCsvToText("../question_results/q8_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 9,
        description: `The MONDIAL Database is a database of geographic and demographic data created in 1998 at Freiburg University and maintained at G¨ottingen University since 2002. Retrieve the names of countries where there are cities with a population greater than 1,000,000.`,
        question_schema: mondialSchema,
        question_data: mondialData,
        answer_data: convertCsvToText("../question_results/q9_ans.csv"),
        max_timeout: 1000
    },
    {
        id: 10,
        description: `The Tour de France is an annual professional road cycling competition held primarily in France, with occasional routes passing through neighbouring countries. Retrieve the total time taken by each team and arrange them in ascending order.`,
        question_schema: mondialSchema,
        question_data: mondialData,
        answer_data: convertCsvToText("../question_results/q10_ans.csv"),
        max_timeout: 1000
    },
];

export default questions