import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Materia} from "../model/materia";
import {Observable} from "rxjs";
import {Vehiculo} from "../model/vehiculo.model";
import {Persona} from "../model/persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlEndPoint:string = environment.urlHost+'api/persona';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient) { }

  crear(persona: PersonaService): Observable<Persona>{
    return this.http.post<Persona>(this.urlEndPoint, persona,{headers: this.httpHeaders})
  }

  listar(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlEndPoint);
  }


  buscarporid(id: number):Observable<Persona>{
    return this.http.get<Persona>(`${this.urlEndPoint}/${id}`);
  }

  editar(persona: Persona): Observable<Materia> {
    const id = `${this.urlEndPoint}/${persona.id}`;
    return this.http.put<Persona>(id, persona, { headers: this.httpHeaders});
  }

  eliminar(id: number): Observable<Persona>{
    return this.http.delete<Persona>(`${this.urlEndPoint}/${id}`)
  }
}
