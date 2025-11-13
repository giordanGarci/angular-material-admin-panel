import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './brasilapi.model';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {
  baseUrl = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    const path = `${this.baseUrl}/ibge/uf/v1`;
    return this.http.get<Estado[]>(path);
  }

  getMunicipios(estado: string): Observable<Municipio[]> {
    const path = `${this.baseUrl}/ibge/municipios/v1/${estado}`;
    console.log(path);
    return this.http.get<Municipio[]>(path);
  }
}
