import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

    constructor(private dataSource: RestDataSource) { }

    authenticate(username: string, password: string): Observable<boolean> {
        return this.dataSource.authenticate(username, password);
    }

    get authenticated(): boolean {
        return this.dataSource.authToken != null;
    }

    clear() {
        this.dataSource.authToken = null;
    }
}