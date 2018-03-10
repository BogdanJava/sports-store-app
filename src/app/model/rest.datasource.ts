import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { Product } from "./product.model";
import { Order } from "./order.model";
import "rxjs/add/operator/map";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    authToken: string;

    constructor(private http: Http) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: this.baseUrl + "login",
            body: { name: user, password: pass }
        })).map(response => {
            let res = response.json();
            this.authToken = res.success ? res.token : null;
            return res.success;
        });
    }

    //products

    getProducts(): Observable<Product[]> {
        return this.sendRequest(RequestMethod.Get, "products");
    }

    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest(RequestMethod.Post, "products",
            product, true);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest(RequestMethod.Put,
            `products/${product.id}`, product, true);
    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest(RequestMethod.Delete,
            `products/${id}`, null, true);
    }

    //orders

    getOrders(): Observable<Order[]> {
        return this.sendRequest(RequestMethod.Get, "orders",
            null, true);
    }

    deleteOrder(id: number): Observable<Order> {
        return this.sendRequest(RequestMethod.Delete,
            `orders/${id}`, null, true);
    }

    updateOrder(order: Order): Observable<Order> {
        return this.sendRequest(RequestMethod.Put,
            `orders/${order.id}`, order, true);
    }

    saveOrder(order: Order): Observable<Order> {
        return this.sendRequest(RequestMethod.Post, "orders", order);
    }

    private sendRequest(verb: RequestMethod,
        url: string, body?: Product | Order, auth: boolean = false): Observable<any> {
        let request = new Request({
            method: verb,
            url: this.baseUrl + url,
            body: body
        });
        if (auth && this.authToken != null) {
            request.headers.set("Authorization", `Bearer<${this.authToken}`);
        }
        return this.http.request(request).map(response => response.json());
    }
}