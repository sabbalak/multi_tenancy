import { Injectable } from '@nestjs/common';
import { CreateListingDto, TenantIdDto, UpdateListingDto } from './common/dto';
import { Listing } from './listing.modal';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingsService {
  constructor(private listingRepository: ListingRepository) {}

  createListing(query: TenantIdDto, obj: CreateListingDto): Promise<Listing> {
    return this.listingRepository.createListing(query, obj);
  }

  getListing(query: TenantIdDto, queryParam: any): Promise<Listing[]> {
    return this.listingRepository.getListing(query, queryParam);
  }

  getListingById(query: TenantIdDto): Promise<Listing> {
    return this.listingRepository.getListingById(query, query.id);
  }

  deleteListingById(query: TenantIdDto): Promise<void> {
    return this.listingRepository.deleteListingById(query, query.id);
  }

  updateListing(query: TenantIdDto, obj: UpdateListingDto): Promise<Listing> {
    return this.listingRepository.updateListing(query, query.id, obj);
  }
}
