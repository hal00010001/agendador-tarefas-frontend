import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UserRegisterPayload {
    nome: string;
    email: string;
    senha: string;
    endereco?: [{
        rua: string;
        numero: string;
        cidade: string;
        estado: string;
        cep: string;
    }],
    telefone?: [{
        ddd: string;
        numero: string;
    }]
}

interface UserRegisterResponse {
    id: string;
    nome: string;
    email: string;
    endereco: [{
        rua: string;
        numero: string;
        cidade: string;
        estado: string;
        cep: string;
    }] | null;
    telefone: [{
        ddd: string;
        numero: string;
    }] | null;
}

@Injectable({
  providedIn: 'root'
})
export class User {
    
    private apiUrl = 'http://localhost:8083/'; // Replace with your actual API endpoint

    constructor(private http: HttpClient) {}

    register(body: UserRegisterPayload): Observable<UserRegisterResponse>{
        return this.http.post<UserRegisterResponse>(`${this.apiUrl}usuario`, body);
    }

}
