import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehiculo} from "../model/vehiculo.model";
import {Observable} from "rxjs";
import {Marca} from "../model/marca.model";
import {Materia} from "../model/materia";

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private urlEndPoint:string = environment.urlHost+'api/materia';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient) { }

  crear(materia: Materia): Observable<Materia>{
    return this.http.post<Vehiculo>(this.urlEndPoint, materia,{headers: this.httpHeaders})
  }

  listar(): Observable<Materia[]>{
    return this.http.get<Materia[]>(this.urlEndPoint);
  }


  buscarporid(id: number):Observable<Materia>{
    return this.http.get<Materia>(`${this.urlEndPoint}/${id}`);
  }

  editar(materia: Materia): Observable<Materia> {
    const id = `${this.urlEndPoint}/${materia.id}`;
    return this.http.put<Materia>(id, materia, { headers: this.httpHeaders});
  }

  eliminar(id: number): Observable<Materia>{
    return this.http.delete<Materia>(`${this.urlEndPoint}/${id}`)
  }
}
