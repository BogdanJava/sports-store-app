import { NgModule } from "@angular/core";
import { ModelModule } from "../model/model.module";
import { StoreComponent } from "./store.component";
import { FormsModule } from '@angular/forms'
import { BrowserModule } from "@angular/platform-browser";
import { CounterDirective } from "./counter.directive";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule],
    declarations: [StoreComponent, CounterDirective],
    exports: [StoreComponent]
})
export class StoreModule { }