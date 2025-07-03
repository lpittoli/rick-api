import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CharactersService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  async getCharacterById(id: number) {
    const response = await axios.get(`${this.baseUrl}/character/${id}`);
    return response.data;
  }

  async getCharacterByName(name: string) {
    const response = await axios.get(`${this.baseUrl}/character/?name=${name}`);
    return response.data.results;
  }

  async getEpisode(id: number) {
    const response = await axios.get(`${this.baseUrl}/episode/${id}`);
    return response.data;
  }

  async getMultipleEpisodes(ids: number[]) {
    const response = await axios.get(`${this.baseUrl}/episode/${ids.join(',')}`);
    return response.data;
  }
}