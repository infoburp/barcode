import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { OnInit } from "@angular/core/src/metadata";
import { HttpClient } from "@angular/common/http";
import { AfterViewInit, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("msgFocus") vc: any;

  barcodes: any = {
    code: "",
    total: 0,
    offset: 0,
    items: []
  };
  barcode: string;
  title = "app";
  // /https://api.upcitemdb.com/prod/trial/lookup?upc=5000382000495
  constructor(private http: HttpClient) {}
  ngAfterViewInit() {
    this.vc.nativeElement.focus();
  }
  lookupBarcode() {
    this.http
      .get("http://localhost:3000/prod/trial/lookup?upc=" + this.barcode)
      .subscribe(data => {
        this.barcodes = data;
        this.barcode = "";
        console.log(data); // using the HttpClient instance, http to call the API then subscribe to the data and display to console
      });
  }

  onChange(newValue) {
    console.log(newValue);
    this.barcode = newValue;
    this.lookupBarcode();
  }
}
