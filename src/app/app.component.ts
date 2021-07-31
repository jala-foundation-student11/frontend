import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Product} from './domain/product';
import {ProductService} from './services/productservice';
import {ContactDto} from "./domain/contact.dto";
import {ContactService} from "./services/contact.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService, MessageService, ProductService]
})
export class AppComponent implements OnInit {

    productDialog: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    statuses: any[];

    contactList: ContactDto[];

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private contactService: ContactService) {
    }

    ngOnInit() {
        this.getContactList(null, null);

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    getContactList(code: string, value: string) {
        this.contactService.getContactList(code, value).subscribe(
            data => {
                this.contactList = data;
                console.warn(this.contactList);
            }, error => {
                console.error(error.error.message);
            }
        )
    }

    saveProduct() {
        console.log("Hello");
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
}
