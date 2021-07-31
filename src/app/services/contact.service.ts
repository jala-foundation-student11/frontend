import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ContactDto} from "../domain/contact.dto";
import {RelationDto} from "../domain/relation.dto";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) {
    }

    private headers() {
        let httpOptions;
        httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-username': 'mwarrick0'
            })
        };
        return httpOptions;
    }


    getContactList(code: string, value: string): Observable<any> {
        let url;
        if (code === null && value === null) {
            url = "http://localhost:8880/api/v1/contact/list"
        } else {
            url = "http://localhost:8880/api/v1/contact/list?code=" + code + "&value=" + value;
        }
        // @ts-ignore
        return this.http.get<any>(url, this.headers()).pipe(map(res => res as ContactDto))
    }

    getRelation(targetUsername: string): Observable<any> {
        const url = "http://localhost:8880/api/v1/contact/relation?targetUsername=" + targetUsername;
        // @ts-ignore
        return this.http.get<any>(url, this.headers()).pipe(map(res => res as RelationDto))
    }
}
