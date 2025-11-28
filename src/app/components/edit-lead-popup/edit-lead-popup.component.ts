import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeadService } from '../../services/lead.service';
import { Lead } from '../../models/lead';

@Component({
  selector: 'app-edit-lead-popup',
  templateUrl: './edit-lead-popup.component.html',
  styleUrls: ['./edit-lead-popup.component.scss'],
  standalone: false
})
export class EditLeadPopupComponent implements OnInit {

  @Input() lead!: Lead;

  constructor(
    private modalCtrl: ModalController,
    private leadService: LeadService
  ) {}

  ngOnInit() {}

  async save() {
    await this.leadService.updateLead(
      this.lead.id,
      this.lead.firstname,
      this.lead.lastname,
      this.lead.address,
      this.lead.email,
      this.lead.phone,
      this.lead.status,
      this.lead.source,
      this.lead.order_type,
      this.lead.rating,
      this.lead.notes
    );

    this.modalCtrl.dismiss({ updated: true }, 'updated');
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
