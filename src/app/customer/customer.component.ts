import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {RestService} from '../rest.service';

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
  mode: string;
  servicesSelected = {
    pp1: false,
    pp2: false,
    hi1: false,
    hctv: false
  };
  allServices = {};
  currCust = {
    customer_id: -1
  };

  constructor(private rest: RestService, private chRef: ChangeDetectorRef) {
    this.mode = '';
    this.getAllServices();
  }
  ngOnInit() {
    this.updateDataTables();
    this.resetServicesSelected();
  }
  resetFormData() {
    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.contact = undefined;
  }
  resetServicesSelected() {
    this.servicesSelected = {
      pp1: false,
      pp2: false,
      hi1: false,
      hctv: false
    };
  }

  showCreateModal() {
    this.mode = 'Create';
    this. currCust = {
      customer_id: -1
    };
    this.resetServicesSelected();
    this.resetFormData();
    this.showModal = true;
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  hideModal() {
    this.showModal = false;
  }

  loadVars(customer) {
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.email = customer.email;
    this.contact = customer.contact;
  }

  viewCustomer(customer) {
    this.mode = 'Edit';
    this.loadVars(customer);
    this.currCust = customer;

    this.rest.loadCustomerServices(customer.customer_id).subscribe(res => {
      console.log(res);
      this.resetServicesSelected();
      const result = JSON.parse(JSON.stringify(res));
      for (const row of result) {
        switch (row.service_id) {
          case 1:
            (this.servicesSelected).pp1 = true;
            break;
          case 2:
            this.servicesSelected.pp2 = true;
            break;
          case 3:
            this.servicesSelected.hi1 = true;
            break;
          case 4:
            this.servicesSelected.hctv = true;
            break;
        }
      }
    },
      () => {
      console.log('error');
      });

    this.chRef.detectChanges();
    this.toggleModal();
  }

  getAllServices() {
    this.rest.getServices().subscribe(res => {
      const result = JSON.parse(JSON.stringify(res));
      this.allServices = result.data;
    });
  }

  createEditCustomer() {
    if (this.firstName === undefined || this.lastName === undefined || this.email === undefined || this.contact === undefined) {
      alert('Please enter all fields');
      return;
    }
    if (this.mode === 'Create') {
      this.rest.addCustomer(this.firstName, this.lastName, this.email, this.contact)
        .subscribe(
          res => {
            const result = JSON.parse(JSON.stringify(res));
            if (result.status) {
              const newID = result.id;
              this.rest.updateSubscriptions(newID, this.getSelectedSubscriptions()).subscribe(res => {
                alert('New Customer added!');
                this.updateDataTables();
              },
                error1 => {
                console.log(error1);
                });
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
    } else {
      const vals = {
        fName: this.firstName,
        lName: this.lastName,
        email: this.email,
        phone: this.contact
      };
      this.rest.updateCustomer(this.currCust.customer_id, vals).subscribe(res => {
        console.log(res);
        this.rest.updateSubscriptions(this.currCust.customer_id, this.getSelectedSubscriptions()).subscribe(res2 => {
              alert('Customer Updated!');
              this.updateDataTables();
            },
            error1 => {
              console.log(error1);
            });
      },
        error1 => {
        console.log(error1);
        });
    }
  }

  getSelectedSubscriptions() {
    const result = [];
    if (this.servicesSelected.pp1) { result.push({id: 1}); }
    if (this.servicesSelected.pp2) { result.push({id: 2}); }
    if (this.servicesSelected.hi1) { result.push({id: 3}); }
    if (this.servicesSelected.hctv) { result.push({id: 4}); }

    return {subscriptions: result};
  }

  private updateDataTables() {
    const table: any = $('table');
    this.rest.getCustomers()
      .subscribe((data: any[]) => {
        this.customers = data;
        this.chRef.detectChanges();
        this.dataTable = table.DataTable();
      });
  }
}
