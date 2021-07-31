import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Product} from './domain/product';
import {ProductService} from './services/productservice';
import {ContactDto} from "./domain/contact.dto";
import {ContactService} from "./services/contact.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RelationDto} from "./domain/relation.dto";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService, MessageService, ProductService]
})
export class AppComponent implements OnInit {

    detailsForm: FormGroup;

    productDialog: boolean;

    relationship: RelationDto;

    product: Product;

    foundRelationship: boolean;

    submitted: boolean;

    statuses: any[];

    contactList: ContactDto[];

    wantRelationship: boolean;

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private contactService: ContactService) {
    }

    ngOnInit() {
        this.getContactList(null, null);
        this.detailsForm = this.createDetailsForm();

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    protected createDetailsForm() {
        return new FormGroup({
                firstName: new FormControl('', Validators.compose([Validators.required])),
                lastName: new FormControl('', Validators.compose([Validators.required])),
            }
        )
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

    showDetails(contact: any) {
        this.submitted = false;
        this.productDialog = true;
        this.detailsForm.controls.firstName.setValue(contact.firstName);
        this.detailsForm.controls.lastName.setValue(contact.lastName);
        this.contactService.getRelation(contact.username).subscribe(
            data => {
                this.relationship = data;
                this.foundRelationship = true;
            }, error => {
                console.error(error);
                this.foundRelationship = false;
            }
        )
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    enableRelationshipSave(event: any) {
        console.log(event);
        this.wantRelationship = event.checked;
        if (this.wantRelationship) {
            this.detailsForm.addControl('relation', new FormControl('', Validators.compose([Validators.required])));
            this.detailsForm.addControl('acquaintanceDate', new FormControl('', Validators.compose([Validators.required])));
        } else {
            this.detailsForm.removeControl('relation');
            this.detailsForm.removeControl('acquaintanceDate');
        }
    }
}
