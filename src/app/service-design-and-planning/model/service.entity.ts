export class ServiceEntity {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  estimatedDuration: number;
  category: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.basePrice = 0;
    this.estimatedDuration = 0;
    this.category = '';
  }
}
