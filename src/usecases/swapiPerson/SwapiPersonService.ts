import { injectable } from 'tsyringe';
import fetch from 'node-fetch';

@injectable()
class SwapiPersonService {
  public async execute() {
    const fetchResult = await fetch('https://swapi.dev/api/people/');

    const json = await fetchResult.json();

    return json;
  }
  public async index() {
    const fetchResult = await fetch('https://swapi.dev/api/people/');

    const json = await fetchResult.json();

    return json;
  }
}
export default SwapiPersonService;
