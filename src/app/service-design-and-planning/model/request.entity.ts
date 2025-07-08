export class RequestEntity {
  id?: string;
  clientId: string;
  technicianId: string;
  propertyId: string;
  serviceId: string;
  problemDescription: string;
  scheduledDate?: string;
  requestedAt?: string;
  status?: string;

  bill: {
    billingPeriod: string;
    energyConsumed: number;
    amountPaid: number;
    billImageUrl: string;
  };

  photos: {
    photoId: string;
    url: string;
  }[];

  constructor() {
    this.clientId = '';
    this.technicianId = '';
    this.propertyId = '';
    this.serviceId = '';
    this.problemDescription = '';
    this.scheduledDate = '';
    this.status = '';
    this.requestedAt = '';

    this.bill = {
      billingPeriod: '',
      energyConsumed: 0,
      amountPaid: 0,
      billImageUrl: ''
    };

    this.photos = [
      {
        photoId: '',
        url: ''
      }
    ];
  }
}
