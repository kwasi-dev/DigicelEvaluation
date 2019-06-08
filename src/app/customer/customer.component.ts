import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {RestService} from "../rest.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: any;
  dataTable: any;

  constructor(private rest: RestService, private chRef: ChangeDetectorRef) { }
  ngOnInit() {
    const table: any = $('table');
    this.rest.getCustomers()
      .subscribe((data: any[]) => {
        this.customers = data;
        this.chRef.detectChanges();
        this.dataTable = table.DataTable();
      });

  }

  onRowClick(component: any) {
    console.log(component);
  }
}
