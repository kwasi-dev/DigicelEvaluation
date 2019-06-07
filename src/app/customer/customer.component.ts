import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: any;
  dataTable: any;

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef) { }
  ngOnInit() {
    const table: any = $('table');
        this.http.get('http://127.0.0.1:5000/customer', {headers: { 'Content-Type': 'application/json' }})
      .subscribe((data: any[]) => {
        this.customers = data;
        this.chRef.detectChanges();

        this.dataTable = table.DataTable(
          {rowId: 'customer_id'}
        );
      });

  }

  onRowClick(component: any) {
    console.log(component);
  }
}
