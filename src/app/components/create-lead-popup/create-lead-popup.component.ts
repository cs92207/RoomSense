import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-create-lead-popup',
  templateUrl: './create-lead-popup.component.html',
  styleUrls: ['./create-lead-popup.component.scss'],
  standalone: false
})
export class CreateLeadPopupComponent {
  
  firstname: string = "";
  lastname: string = "";
  address: string = "";
  email: string = "";
  phone: string = "";
  status: string = "Neu";
  source: string = "Website";
  order_type: string = "Webdesign";
  rating: string = "Normal";
  notes: string = "";

  isSaving = false;

  constructor(
    private modalCtrl: ModalController,
    private leadService: LeadService
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  async saveLead() {

    if (!this.firstname || !this.lastname || !this.email) {
      alert("Bitte mindestens Vorname, Nachname und Email ausfüllen!");
      return;
    }

    this.isSaving = true;

    await this.leadService.createLead(
      this.firstname,
      this.lastname,
      this.address,
      this.email,
      this.phone,
      this.status,
      this.source,
      this.order_type,
      this.rating,
      this.notes
    );

    this.isSaving = false;

    this.modalCtrl.dismiss({ created: true }, "created");
  }
}
