import { Injectable } from '@nestjs/common';
import { User } from '../User/user.modal';
import { CreateListingDto, TenantIdDto, UpdateListingDto } from './common/dto';
import { Listing } from './listing.modal';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingsService {
  constructor(private listingRepository: ListingRepository) {}

  createListing(
    query: TenantIdDto,
    obj: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    return this.listingRepository.createListing(query, obj, user);
  }

  getListing(query: TenantIdDto): Promise<Listing[]> {
    return this.listingRepository.getListing(query);
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
