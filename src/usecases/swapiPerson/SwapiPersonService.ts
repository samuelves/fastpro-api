import { injectable } from 'tsyringe';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

type PaginatedResponse = {
  total: number;
  page: number;
  status: number;
  totalPages: number;
  next: string | null;
  previous: string | null;
  results: SwapiPerson[];
};

type NotFound = {
  status: 404;
};
@injectable()
class SwapiPersonService {
  public async execute(page: string): Promise<PaginatedResponse | NotFound> {
    const fetchResult = await fetch(
      'https://swapi.dev/api/people/?page=' + page
    );

    const json = await fetchResult.json();
    const statusCode = fetchResult.status;
    if (statusCode !== 200) {
      return {
        status: 404,
      };
    }
    const totalPages = Math.ceil(json.count / 10);
    const nextPage = json.next ? json.next.split('=')[1] : null;
    const previousPage = json.previous ? json.previous.split('=')[1] : null;
    const response = {
      status: 200,
      total: json.count,
      totalPages,
      page: Number(page),
      next: nextPage
        ? `${process.env.APP_URL}swapi/people?page=${nextPage}`
        : null,
      previous: previousPage
        ? `${process.env.APP_URL}swapi/people?page=${previousPage}`
        : null,
      results: json.results.map((data: SwapiPerson) => ({
        name: data.name,
        height: data.height,
        mass: data.mass,
        hair_color: data.hair_color,
        skin_color: data.skin_color,
        eye_color: data.eye_color,
        birth_year: data.birth_year,
        gender: data.gender,
      })),
    };
    return response;
  }
}
export default SwapiPersonService;
