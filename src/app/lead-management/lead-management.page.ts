import { Component, OnInit } from '@angular/core';
import { Lead } from '../models/lead';
import { LeadService } from '../services/lead.service';
import { ModalController } from '@ionic/angular';
import { CreateLeadPopupComponent } from '../components/create-lead-popup/create-lead-popup.component';
import { EditLeadPopupComponent } from '../components/edit-lead-popup/edit-lead-popup.component';

@Component({
  selector: 'app-lead-management',
  templateUrl: './lead-management.page.html',
  styleUrls: ['./lead-management.page.scss'],
  standalone: false
})
export class LeadManagementPage implements OnInit {

  collapsed = false;
  isLoading = true;

  leads: Lead[] = [];

  constructor(
    private leadService: LeadService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.loadLeads();
  }

  async loadLeads() {
    this.isLoading = true;
    this.leads = await this.leadService.getAllLeadsFromUser();
    this.isLoading = false;
  }

  reload() {
    this.loadLeads();
  }

  onSidebarChange(state: boolean) {
    this.collapsed = state;
  }

  // ---------------------------------------------------------
  // CREATE LEAD POPUP
  // ---------------------------------------------------------
  async openCreateLead() {
    const modal = await this.modalCtrl.create({
      component: CreateLeadPopupComponent,
      cssClass: 'adaptable-modal',
      showBackdrop: true,
      backdropDismiss: true
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'created') {
      this.loadLeads();
    }
  }

  // ---------------------------------------------------------
  // EDIT LEAD POPUP
  // ---------------------------------------------------------
  async openEditLead(lead: Lead) {
    const modal = await this.modalCtrl.create({
      component: EditLeadPopupComponent,
      cssClass: 'adaptable-modal',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        lead: { ...lead } // Kopie! Keine Live-Änderung
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'updated') {
      this.loadLeads();
    }
  }

  // ---------------------------------------------------------
  // DELETE LEAD
  // ---------------------------------------------------------
  async deleteLead(id: number) {
    if (confirm("Möchtest du diesen Lead wirklich löschen?")) {
      await this.leadService.deleteLead(id);
      this.loadLeads();
    }
  }
}
