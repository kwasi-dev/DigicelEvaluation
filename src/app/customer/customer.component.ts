import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  showModal = false;


  firstName: string;
  lastName: string;
  email: string;
  contact: string;

  servicesSelected = {};
  mode = '';

  constructor(private rest: RestService, private chRef: ChangeDetectorRef) { }
  ngOnInit() {
    const table: any = $('table');
    this.rest.getCustomers()
      .subscribe((data: any[]) => {
        this.customers = data;
        this.chRef.detectChanges();
        this.dataTable = table.DataTable();
      });
    this.resetServicesSelected();
  }
  resetServicesSelected(){
    this.servicesSelected = {
      pp1: false,
      pp2: false,
      hi1: false,
      hctv: false
    };
  }
  // onRowClick(component: any) {
  //   console.log(component);
  // }
  toggleModal() {
    this.showModal = !this.showModal;

  }
  createCustomer() {
    if (this.firstName === undefined || this.lastName === undefined || this.email === undefined || this.contact === undefined) {
      alert('Please enter all fields');
      return;
    }
    this.rest.addCustomer(this.firstName, this.lastName, this.email, this.contact)
      .subscribe(
        res => {
          const result = JSON.parse(JSON.stringify(res));
          if (result.status) {
            alert('Customer created successfully');
            this.showModal = false;
          } else {
            alert (result.message);
          }
        },
        it => {
          console.log(it);
          alert('An error occurred, please try again later');
        }
      );
  }
}
